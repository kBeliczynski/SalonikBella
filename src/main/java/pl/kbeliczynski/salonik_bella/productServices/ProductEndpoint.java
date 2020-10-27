package pl.kbeliczynski.salonik_bella.productServices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProductEndpoint {
    private ProductRepository productRepository;

    @Autowired
    public ProductEndpoint(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping("/api/products")
    public List<Product> getAll(){return productRepository.findAll();}

    @GetMapping("/api/products/{name}")
    public List<Product> getAllByCategory(@PathVariable String name){
        return productRepository.findAllByCategoriesName(name);
    }

    @GetMapping("/api/products/{name}/{id}")
    public ResponseEntity<Product> getById(@PathVariable String name, @PathVariable Long id) {
        return productRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
