package lt.viko.eif.nkulbis.gardeningApp.controllers;

import lt.viko.eif.nkulbis.gardeningApp.models.Category;
import lt.viko.eif.nkulbis.gardeningApp.models.Garden;
import lt.viko.eif.nkulbis.gardeningApp.repositories.ICategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(path = "/category")
public class CategoryController {

    @Autowired
    private ICategoryRepository categoryRepository;


    @GetMapping(path = "/all")
    public ResponseEntity<?> getAllCategories() {
        try {
            Iterable<Category> categories = categoryRepository.findAll();
            return ResponseEntity.ok().body(categories);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to retrieve categories. Please try again later.");
        }
    }
}
