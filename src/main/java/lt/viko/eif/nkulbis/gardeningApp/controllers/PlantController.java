package lt.viko.eif.nkulbis.gardeningApp.controllers;

import lt.viko.eif.nkulbis.gardeningApp.exceptions.ResourceNotFoundException;
import lt.viko.eif.nkulbis.gardeningApp.models.Garden;
import lt.viko.eif.nkulbis.gardeningApp.models.GardenPlants;
import lt.viko.eif.nkulbis.gardeningApp.models.Plant;
import lt.viko.eif.nkulbis.gardeningApp.repositories.IGardenPlantsRepository;
import lt.viko.eif.nkulbis.gardeningApp.repositories.IGardenRepository;
import lt.viko.eif.nkulbis.gardeningApp.repositories.IPlantRepository;
import lt.viko.eif.nkulbis.gardeningApp.requests.AssignPlantToGardenRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

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

    @PostMapping(path = "/assign")
    public ResponseEntity<?> assignPlantToGarden(@RequestBody AssignPlantToGardenRequest request) {
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
}
