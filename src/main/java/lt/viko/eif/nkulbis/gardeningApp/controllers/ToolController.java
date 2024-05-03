package lt.viko.eif.nkulbis.gardeningApp.controllers;

import lt.viko.eif.nkulbis.gardeningApp.exceptions.ResourceNotFoundException;
import lt.viko.eif.nkulbis.gardeningApp.models.Garden;
import lt.viko.eif.nkulbis.gardeningApp.models.GardenTools;
import lt.viko.eif.nkulbis.gardeningApp.models.GardenUsers;
import lt.viko.eif.nkulbis.gardeningApp.models.Tool;
import lt.viko.eif.nkulbis.gardeningApp.repositories.IGardenToolsRepository;
import lt.viko.eif.nkulbis.gardeningApp.repositories.IToolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping(path = "/tool")
public class ToolController {

    @Autowired
    private IToolRepository toolRepository;

    @Autowired
    private IGardenToolsRepository gardenToolsRepository;

    @GetMapping(path = "/{gardenId}")
    public ResponseEntity<?> getToolsByGardenId(@PathVariable Long gardenId) {
        try {
            List<GardenTools> gardenTools = gardenToolsRepository.findByGardenId(gardenId);

            List<Tool> tools = gardenTools.stream()
                    .map(gardenTool -> gardenTool.getTool())
                    .collect(Collectors.toList());
            return ResponseEntity.ok().body(tools);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to retrieve tools. Please try again later.");
        }
    }
}
