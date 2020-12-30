package pl.kbeliczynski.salonik_bella.visitService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;

@RestController
public class VisitEndpoint {
    private VisitRepository visitRepository;

    @Autowired
    public VisitEndpoint(VisitRepository visitRepository) {
        this.visitRepository = visitRepository;
    }

    @GetMapping("/api/visits")
    public List<Visit> getAll(){
        return visitRepository.findAll();
    }

    @GetMapping("/api/visits/{id}")
    public ResponseEntity<Visit> getById(@PathVariable Long id) {
        return visitRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
