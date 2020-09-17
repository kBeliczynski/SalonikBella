package pl.kbeliczynski.salonik_bella.hairdressingServices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import pl.kbeliczynski.salonik_bella.hairdressingServices.Haircut;

import java.util.List;
import java.util.Optional;

@RestController
public class HaircutEndpoint {
    private HaircutRepository haircutRepository;

    @Autowired
    public HaircutEndpoint(HaircutRepository haircutRepository) {
        this.haircutRepository = haircutRepository;
    }

    @GetMapping("/api/haircuts")
    public List<Haircut> getAll(){
        return haircutRepository.findAll();
    }

    @GetMapping("/api/haircuts/{id}")
     public ResponseEntity<Haircut> getById(@PathVariable Long id) {
         Haircut haircut = haircutRepository.getOne(id);
         if(haircut != null) {
             return ResponseEntity.ok(haircut);
         } else {
             return ResponseEntity.notFound().build();
         }
     }

}
