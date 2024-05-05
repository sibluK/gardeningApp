package lt.viko.eif.nkulbis.gardeningApp.controllers;

import lt.viko.eif.nkulbis.gardeningApp.exceptions.ResourceNotFoundException;
import lt.viko.eif.nkulbis.gardeningApp.models.*;
import lt.viko.eif.nkulbis.gardeningApp.repositories.*;
import lt.viko.eif.nkulbis.gardeningApp.requests.ToolRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Controller
@RequestMapping(path = "/tool")
public class ToolController {

    @Autowired
    private IToolRepository toolRepository;
    @Autowired
    private IGardenToolsRepository gardenToolsRepository;

    @Autowired
    private ICategoryRepository categoryRepository;

    @Autowired
    private IAvailabilityRepository availabilityRepository;

    @Autowired
    private IGardenRepository gardenRepository;

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

    @PostMapping("/add")
    public ResponseEntity<?> addTool(@RequestBody ToolRequest toolRequest) {
        try {
            Optional<Category> categoryOptional = categoryRepository.findById(toolRequest.getCategoryId());
            Optional<Availability> availabilityOptional = availabilityRepository.findById(toolRequest.getAvailabilityId());
            Optional<Garden> gardenOptional = gardenRepository.findById(toolRequest.getGardenId());

            if (categoryOptional.isEmpty() || availabilityOptional.isEmpty() || gardenOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Category, availability, or garden not found.");
            }

            Category category = categoryOptional.get();
            Availability availability = availabilityOptional.get();
            Garden garden = gardenOptional.get();

            Tool tool = new Tool();
            tool.setAvailability(availability);
            tool.setCategory(category);
            tool.setDescription(toolRequest.getDescription());
            tool.setName(toolRequest.getName());
            tool.setLastUsedDate(toolRequest.getLastUsedDate());
            Tool savedTool = toolRepository.save(tool);

            GardenTools gardenTools = new GardenTools();
            gardenTools.setGarden(garden);
            gardenTools.setTool(savedTool);
            gardenToolsRepository.save(gardenTools);

            return ResponseEntity.ok(savedTool);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to add tool. Please try again later.");
        }
    }

}
