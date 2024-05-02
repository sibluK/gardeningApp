package lt.viko.eif.nkulbis.gardeningApp.controllers;

import lt.viko.eif.nkulbis.gardeningApp.models.Garden;
import lt.viko.eif.nkulbis.gardeningApp.models.GardenUsers;
import lt.viko.eif.nkulbis.gardeningApp.repositories.IGardenRepository;
import lt.viko.eif.nkulbis.gardeningApp.repositories.IGardenUsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Controller
@RequestMapping(path = "/garden")
public class GardenController {

    @Autowired
    private IGardenRepository gardenRepository;

    @Autowired
    private IGardenUsersRepository gardenUsersRepository;

    @PostMapping(path = "/create")
    public ResponseEntity<?> createNewGarden(@RequestBody Garden garden) {
        try {
            Garden savedGarden = gardenRepository.save(garden);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedGarden);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to create garden. Please try again later.");
        }
    }

    @GetMapping(path = "/all")
    public ResponseEntity<?> getAllGardens() {
        try {
            Iterable<Garden> gardens = gardenRepository.findAll();
            return ResponseEntity.ok().body(gardens);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to retrieve gardens. Please try again later.");
        }
    }

    @GetMapping(path = "/gardens")
    public ResponseEntity<?> getGardensByUserId(@RequestParam Long userId) {
        try {
            // Find the gardens associated with the given user ID
            List<GardenUsers> gardenUsers = gardenUsersRepository.findByUserId(userId);

            List<Garden> gardens = gardenUsers.stream()
                    .map(gardenUser -> gardenUser.getGarden())
                    .collect(Collectors.toList());

            return ResponseEntity.ok().body(gardens);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to retrieve gardens for the user. Please try again later.");
        }
    }
}
