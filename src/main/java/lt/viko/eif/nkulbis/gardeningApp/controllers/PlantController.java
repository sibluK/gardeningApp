package lt.viko.eif.nkulbis.gardeningApp.controllers;

import lt.viko.eif.nkulbis.gardeningApp.models.Garden;
import lt.viko.eif.nkulbis.gardeningApp.models.Plant;
import lt.viko.eif.nkulbis.gardeningApp.repositories.IPlantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(path = "/plant")
public class PlantController {
    @Autowired
    private IPlantRepository plantRepository;
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
}
