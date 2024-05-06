package lt.viko.eif.nkulbis.gardeningApp.controllers;

import lt.viko.eif.nkulbis.gardeningApp.exceptions.ResourceNotFoundException;
import lt.viko.eif.nkulbis.gardeningApp.models.Garden;
import lt.viko.eif.nkulbis.gardeningApp.models.GardenUsers;
import lt.viko.eif.nkulbis.gardeningApp.models.User;
import lt.viko.eif.nkulbis.gardeningApp.repositories.IGardenRepository;
import lt.viko.eif.nkulbis.gardeningApp.repositories.IGardenUsersRepository;
import lt.viko.eif.nkulbis.gardeningApp.repositories.IUserRepository;
import lt.viko.eif.nkulbis.gardeningApp.requests.AssignOrRemoveUserRequest;
import lt.viko.eif.nkulbis.gardeningApp.requests.CreateGardenRequest;
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
    public ResponseEntity<?> createNewGarden(@RequestBody CreateGardenRequest request) {
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

    @GetMapping(path = "/{gardenId}")
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

    @PostMapping(path = "/user/assign")
    public ResponseEntity<?> assignUser(@RequestBody AssignOrRemoveUserRequest request) {
        try {
            Garden garden = gardenRepository.findById(request.getGardenId())
                    .orElseThrow(() -> new ResourceNotFoundException("Garden not found"));

            User user = userRepository.findByUsername(request.getUsername())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));

            GardenUsers gardenUsers = new GardenUsers();
            gardenUsers.setGarden(garden);
            gardenUsers.setUser(user);
            GardenUsers savedGardenUsers = gardenUsersRepository.save(gardenUsers);

            return ResponseEntity.status(HttpStatus.CREATED).body(savedGardenUsers);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Failed to find required entity: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to assign user to a garden. Please try again later.");
        }
    }

    @PostMapping(path = "/user/remove")
    public ResponseEntity<?> removeUser(@RequestBody AssignOrRemoveUserRequest request) {
        try {

            User user = userRepository.findByUsername(request.getUsername())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));

            Garden garden = gardenRepository.findById(request.getGardenId())
                    .orElseThrow(() -> new ResourceNotFoundException("Garden not found"));

            GardenUsers gardenUser = gardenUsersRepository.findByUserAndGarden(user, garden)
                    .orElseThrow(() -> new ResourceNotFoundException("User not associated with this garden"));

            gardenUsersRepository.delete(gardenUser);

            return ResponseEntity.status(HttpStatus.CREATED).body("User removed from garden");
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Failed to find required entity: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to assign user to a garden. Please try again later.");
        }
    }

}
