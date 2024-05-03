package lt.viko.eif.nkulbis.gardeningApp.controllers;

import lt.viko.eif.nkulbis.gardeningApp.exceptions.ResourceNotFoundException;
import lt.viko.eif.nkulbis.gardeningApp.models.Garden;
import lt.viko.eif.nkulbis.gardeningApp.models.GardenUsers;
import lt.viko.eif.nkulbis.gardeningApp.models.User;
import lt.viko.eif.nkulbis.gardeningApp.repositories.IGardenRepository;
import lt.viko.eif.nkulbis.gardeningApp.repositories.IGardenUsersRepository;
import lt.viko.eif.nkulbis.gardeningApp.repositories.IUserRepository;
import lt.viko.eif.nkulbis.gardeningApp.requests.GardenRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping(path = "/garden")
public class GardenController {

    @Autowired
    private IGardenRepository gardenRepository;

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IGardenUsersRepository gardenUsersRepository;

    @PostMapping(path = "/create")
    public ResponseEntity<?> createNewGarden(@RequestBody GardenRequest request) {
        try {
            Garden garden = new Garden();
            garden.setName(request.getName());
            garden.setSize(request.getSize());
            garden.setCountry(request.getCountry());
            garden.setCity(request.getCity());
            garden.setStreet(request.getStreet());
            garden.setDescription(request.getDescription());
            Garden savedGarden = gardenRepository.save(garden);

            Long userId = request.getUserId();
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

            GardenUsers gardenUsers = new GardenUsers();
            gardenUsers.setGarden(savedGarden);
            gardenUsers.setUser(user);
            gardenUsersRepository.save(gardenUsers);

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

    @GetMapping(path = "/manage/{gardenId}")
    public ResponseEntity<?> getGardenById(@PathVariable Long gardenId) {
        try {
            Garden garden = gardenRepository.findById(gardenId)
                    .orElseThrow(() -> new ResourceNotFoundException("Garden not found with id: " + gardenId));
            return ResponseEntity.ok().body(garden);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to retrieve garden. Please try again later.");
        }
    }
}
