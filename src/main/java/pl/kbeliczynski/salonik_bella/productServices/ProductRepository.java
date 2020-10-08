package pl.kbeliczynski.salonik_bella.productServices;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {
    List<Product> findAllByCategoryName(String name);
    ResponseEntity<Product> findAllByCategoryNameAndId(String name,Long id);
}
