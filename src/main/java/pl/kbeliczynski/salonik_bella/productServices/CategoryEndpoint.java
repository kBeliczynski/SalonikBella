package pl.kbeliczynski.salonik_bella.productServices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CategoryEndpoint {
    private CategoryRepository categoryRepository;

    @Autowired
    public CategoryEndpoint(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @GetMapping("/api/categories")
    public List<Category> getAll(){return categoryRepository.findAll();}
}
