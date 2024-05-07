package lt.viko.eif.nkulbis.gardeningApp.controllers;

import lt.viko.eif.nkulbis.gardeningApp.exceptions.ResourceNotFoundException;
import lt.viko.eif.nkulbis.gardeningApp.models.*;
import lt.viko.eif.nkulbis.gardeningApp.repositories.IGardenMaterialsRepository;
import lt.viko.eif.nkulbis.gardeningApp.repositories.IGardenRepository;
import lt.viko.eif.nkulbis.gardeningApp.repositories.IMaterialRepository;
import lt.viko.eif.nkulbis.gardeningApp.requests.AddMaterialRequest;
import lt.viko.eif.nkulbis.gardeningApp.requests.RemoveMaterialRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping(path = "/material")
public class MaterialController {
    @Autowired
    private IMaterialRepository materialRepository;
    @Autowired
    private IGardenRepository gardenRepository;
    @Autowired
    private IGardenMaterialsRepository gardenMaterialsRepository;

    @GetMapping(path = "/{gardenId}")
    public ResponseEntity<?> getMaterialsByGardenId(@PathVariable Long gardenId) {
        try {
            List<GardenMaterials> gardenMaterials = gardenMaterialsRepository.findAllByGardenId(gardenId);

            List<Material> materials = gardenMaterials.stream()
                    .map(gardenMaterial -> gardenMaterial.getMaterial())
                    .collect(Collectors.toList());
            return ResponseEntity.ok().body(materials);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to retrieve materials. Please try again later.");
        }
    }
    @PostMapping("/add")
    public ResponseEntity<?> addMaterial(@RequestBody AddMaterialRequest request) {
        try {
            Material material = new Material();
            material.setDescription(request.getDescription());
            material.setName(request.getName());
            material.setType(request.getType());
            material.setQuantity(request.getQuantity());
            material.setExpirationDate(request.getExpirationDate());
            material.setUnit(request.getUnit());

            Material savedMaterial = materialRepository.save(material);

            Garden garden = gardenRepository.findById(request.getGardenId())
                    .orElseThrow(() -> new ResourceNotFoundException("Garden not found"));

            GardenMaterials gardenMaterials = new GardenMaterials();
            gardenMaterials.setMaterial(savedMaterial);
            gardenMaterials.setGarden(garden);

            GardenMaterials savedGardenMaterials = gardenMaterialsRepository.save(gardenMaterials);

            return ResponseEntity.ok(savedGardenMaterials);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to add material. Please try again later.");
        }
    }
    @PostMapping("/remove")
    public ResponseEntity<?> removeMaterial(@RequestBody RemoveMaterialRequest request) {
        try {
            Material material = materialRepository.findById(request.getMaterialId())
                    .orElseThrow(() -> new ResourceNotFoundException("Material not found"));
            Garden garden = gardenRepository.findById(request.getGardenId())
                    .orElseThrow(() -> new ResourceNotFoundException("Garden not found"));

            GardenMaterials gardenMaterials = gardenMaterialsRepository.getByGardenAndMaterial(garden, material)
                    .orElseThrow(() -> new ResourceNotFoundException("Material not associated with garden"));

            gardenMaterialsRepository.delete(gardenMaterials);
            materialRepository.delete(material);

            return ResponseEntity.ok("Material removed to the garden");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to add material. Please try again later.");
        }
    }

}
