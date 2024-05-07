package lt.viko.eif.nkulbis.gardeningApp.controllers;


import lt.viko.eif.nkulbis.gardeningApp.exceptions.ResourceNotFoundException;
import lt.viko.eif.nkulbis.gardeningApp.models.GardenUsers;
import lt.viko.eif.nkulbis.gardeningApp.models.TaskUsers;
import lt.viko.eif.nkulbis.gardeningApp.repositories.ITaskUsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping(path = "/task")
public class TaskController {

    @Autowired
    private ITaskUsersRepository taskUsersRepository;

    @GetMapping(path = "/all/number/{userId}")
    public ResponseEntity<?> getNumberOfTasksByUserId(@PathVariable Long userId) {
        try {
            List<TaskUsers> taskUsers = taskUsersRepository.findByUserId(userId);
            int numberOfTasksForUser = taskUsers.size();

            return ResponseEntity.status(HttpStatus.OK).body(numberOfTasksForUser);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Failed to find required entity: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to fetch number of tasks. Please try again later.");
        }
    }

}
