package lt.viko.eif.nkulbis.gardeningApp.controllers;

import lt.viko.eif.nkulbis.gardeningApp.models.Garden;
import lt.viko.eif.nkulbis.gardeningApp.repositories.IGardenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.Map;

@Controller
@RequestMapping(path = "/garden")
public class GardenController {

    @Autowired
    private IGardenRepository gardenRepository;

    @PostMapping(path = "/create")
    public ResponseEntity<?> createNewGarden(@RequestBody Garden garden) {
        gardenRepository.save(garden);
        return ResponseEntity.ok().body(Map.of("message", "Garden saved successfully"));
    }



    @GetMapping(path = "/all")
    public @ResponseBody Iterable<Garden> getAllGardens() {
        return gardenRepository.findAll();
    }


}
