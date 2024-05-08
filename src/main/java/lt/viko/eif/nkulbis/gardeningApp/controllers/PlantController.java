package lt.viko.eif.nkulbis.gardeningApp.controllers;

import lt.viko.eif.nkulbis.gardeningApp.exceptions.ResourceNotFoundException;
import lt.viko.eif.nkulbis.gardeningApp.models.*;
import lt.viko.eif.nkulbis.gardeningApp.repositories.IGardenPlantsRepository;
import lt.viko.eif.nkulbis.gardeningApp.repositories.IGardenRepository;
import lt.viko.eif.nkulbis.gardeningApp.repositories.IPlantRepository;
import lt.viko.eif.nkulbis.gardeningApp.requests.AssignOrRemovePlantToGardenRequest;
import lt.viko.eif.nkulbis.gardeningApp.requests.RemoveMaterialRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping(path = "/plant")
public class PlantController {
    @Autowired
    private IPlantRepository plantRepository;
    @Autowired
    private IGardenPlantsRepository gardenPlantsRepository;
    @Autowired
    private IGardenRepository gardenRepository;

    @GetMapping(path = "/all")
    public ResponseEntity<?> getAllPlants() {
        try {
            Iterable<Plant> plants = plantRepository.findAll();
            return ResponseEntity.ok().body(plants);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to retrieve plants. Please try again later.");
        }
    }

    @GetMapping(path = "/{gardenId}")
    public ResponseEntity<?> getAllPlantsByGardenId(@PathVariable Long gardenId) {
        try {
            List<GardenPlants> gardenPlants = gardenPlantsRepository.findAllByGardenId(gardenId);

            List<Plant> plants = gardenPlants.stream()
                    .map(gardenPlant -> gardenPlant.getPlant())
                    .collect(Collectors.toList());
            return ResponseEntity.ok().body(plants);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to retrieve assigned plants. Please try again later.");
        }
    }

    @PostMapping(path = "/assign")
    public ResponseEntity<?> assignPlantToGarden(@RequestBody AssignOrRemovePlantToGardenRequest request) {
        try {
            Garden garden = gardenRepository.findById(request.getGardenId())
                    .orElseThrow(() -> new ResourceNotFoundException("Garden not found"));
            Plant plant = plantRepository.findById(request.getPlantId())
                    .orElseThrow(() -> new ResourceNotFoundException("Plant not found"));

            GardenPlants gardenPlants = new GardenPlants();
            gardenPlants.setGarden(garden);
            gardenPlants.setPlant(plant);
            gardenPlants.setDatePlanted(new Date());

            GardenPlants savedGardenPlants = gardenPlantsRepository.save(gardenPlants);

            return ResponseEntity.ok().body(savedGardenPlants);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to add plant. Please try again later.");
        }
    }

    @PostMapping("/remove")
    public ResponseEntity<?> removePlant(@RequestBody AssignOrRemovePlantToGardenRequest request) {
        try {
            Plant plant = plantRepository.findById(request.getPlantId())
                    .orElseThrow(() -> new ResourceNotFoundException("Plant not found"));
            Garden garden = gardenRepository.findById(request.getGardenId())
                    .orElseThrow(() -> new ResourceNotFoundException("Garden not found"));

            GardenPlants gardenPlants = gardenPlantsRepository.getByGardenAndPlant(garden, plant)
                    .orElseThrow(() -> new ResourceNotFoundException("Plant not associated with garden"));

            gardenPlantsRepository.delete(gardenPlants);

            return ResponseEntity.ok("Plant removed to the garden");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to remove plant. Please try again later.");
        }
    }
}
