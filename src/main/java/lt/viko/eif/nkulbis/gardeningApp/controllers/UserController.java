package lt.viko.eif.nkulbis.gardeningApp.controllers;

import lt.viko.eif.nkulbis.gardeningApp.models.User;
import lt.viko.eif.nkulbis.gardeningApp.models.UserType;
import lt.viko.eif.nkulbis.gardeningApp.repositories.IUserRepository;
import lt.viko.eif.nkulbis.gardeningApp.repositories.IUserTypeRepository;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Controller
@RequestMapping(path = "/user")
public class UserController {

    @Autowired
    private IUserRepository userRepository;
    @Autowired
    private IUserTypeRepository userTypeRepository;

    @PostMapping(path = "/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            Optional<UserType> userTypeOptional = userTypeRepository.findById(Long.valueOf(2));
            if (userTypeOptional.isPresent()) {
                UserType userType = userTypeOptional.get();

                user.setType(userType);

                String hashedPassword = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt());
                user.setPassword(hashedPassword);

                User savedUser = userRepository.save(user);
                return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("UserType not found for ID: " + Long.valueOf(2));
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to register user. Please try again later.");
        }
    }

    @PostMapping(path = "/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        Optional<User> optionalUser = userRepository.findByUsername(user.getUsername());

        if (optionalUser.isPresent()) {
            User storedUser = optionalUser.get();
            if (BCrypt.checkpw(user.getPassword(), storedUser.getPassword())) {
                // Construct a response containing the user ID and the message
                Map<String, Object> responseData = new HashMap<>();
                responseData.put("userId", storedUser.getId());
                responseData.put("username", storedUser.getUsername());
                responseData.put("message", "Login successful");
                return ResponseEntity.ok().body(responseData);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

}
