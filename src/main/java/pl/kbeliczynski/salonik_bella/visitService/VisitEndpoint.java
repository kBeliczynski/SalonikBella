package pl.kbeliczynski.salonik_bella.visitService;

import org.springframework.aop.scope.ScopedProxyUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import pl.kbeliczynski.salonik_bella.user.User;


import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
public class VisitEndpoint {
    private VisitRepository visitRepository;

    @Autowired
    public VisitEndpoint(VisitRepository visitRepository) {
        this.visitRepository = visitRepository;
    }

    @GetMapping("/api/visits")
    public List<Visit> getAll(@RequestParam(required = false) String date) {
        if(date != null)
            return visitRepository.findByVisitBeginContaining(date);
        else
            return visitRepository.findAll();
    }


    @GetMapping("/api/visits/{id}")
    public ResponseEntity<Visit> getById(@PathVariable Long id) {
        return visitRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping(value = "/api/visits")
    public ResponseEntity<Visit> save(@RequestBody Visit visit) {
        if(visit.getId() == null) {
            Visit saved = visitRepository.save(visit);
            URI location = ServletUriComponentsBuilder
                    .fromCurrentRequest()
                    .path("/{id}")
                    .buildAndExpand(saved.getId())
                    .toUri();
            return ResponseEntity.created(location).body(visit);
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @DeleteMapping("/api/visits/{id}")
    public void remove(@PathVariable Long id) {
        visitRepository.deleteById(id);
    }

    @PutMapping("/api/visits/{id}")
    public ResponseEntity<Visit> update(@RequestBody Visit visit, @PathVariable Long id) {
        Optional<Visit> newVisit = visitRepository.findById(id);
        newVisit.get().setStatus(visit.getStatus());    //ustawia status użytkownika
        newVisit.get().setAdminInfo(visit.getAdminInfo());     // podmienia wiadomosc do użytkownika
        Visit saved = visitRepository.save(newVisit.get());
        URI location = ServletUriComponentsBuilder
                    .fromCurrentRequest()
                    .path("/{id}")
                    .buildAndExpand(saved.getId())
                    .toUri();
            return ResponseEntity.created(location).body(visit);
    }

}
