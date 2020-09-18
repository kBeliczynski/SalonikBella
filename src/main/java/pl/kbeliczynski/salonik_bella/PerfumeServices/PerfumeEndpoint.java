package pl.kbeliczynski.salonik_bella.PerfumeServices;

import org.aspectj.lang.annotation.Around;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pl.kbeliczynski.salonik_bella.hairdressingServices.Haircut;

import java.util.List;

@RestController
public class PerfumeEndpoint {
    private PerfumeRepository perfumeRepository;

    @Autowired
    public PerfumeEndpoint(PerfumeRepository perfumeRepository){
        this.perfumeRepository = perfumeRepository;
    }

    @GetMapping("/api/perfumes")
    public List<Perfume> getAll(@RequestParam(required = false) String name,@RequestParam(required = false) String gender) {
        if(gender != null)
            return perfumeRepository.findByGenderContaining(gender);
        else if(name != null)
            return perfumeRepository.findByNameContainingIgnoreCase(name);
        else
            return perfumeRepository.findAll();
    }

    @GetMapping("/api/perfumes/{id}")
    public ResponseEntity<Perfume> getById(@PathVariable Long id) {
        Perfume perfume = perfumeRepository.getOne(id);
        if(perfume != null) {
            return ResponseEntity.ok(perfume);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
