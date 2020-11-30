package pl.kbeliczynski.salonik_bella.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import pl.kbeliczynski.salonik_bella.PerfumeServices.PerfumeRepository;
import pl.kbeliczynski.salonik_bella.productServices.ProductRepository;

import java.net.URI;
import java.util.List;

@RestController
public class UserEndpoint {
    private UserRepository userRepository;
    private ProductRepository productRepository;
    private PerfumeRepository perfumeRepository;
    private UserRoleRepository userRoleRepository;
    private UserService userService;

    @Autowired
    public UserEndpoint(UserRepository userRepository,ProductRepository productRepository,PerfumeRepository perfumeRepository, UserRoleRepository userRoleRepository,UserService userService) {
        this.userRepository = userRepository;
        this.perfumeRepository = perfumeRepository;
        this.productRepository = productRepository;
        this.userRoleRepository = userRoleRepository;
        this.userService = userService;
    }

    @GetMapping("/api/users")
    public List<User> getAll(){
        return userRepository.findAll();
    }

    @GetMapping("/api/users/{id}")
     public ResponseEntity<User> getById(@PathVariable Long id) {
         User user = userRepository.getOne(id);
         if(user != null) {
             return ResponseEntity.ok(user);
         } else {
             return ResponseEntity.notFound().build();
         }
     }

    @PostMapping(value = "/api/users", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> save(@RequestBody User user) {
        if(user.getId() == null) {
            userService.addWithDefaultRole(user);
            User saved = userRepository.save(user);
            URI location = ServletUriComponentsBuilder
                    .fromCurrentRequest()
                    .path("/{id}")
                    .buildAndExpand(saved.getId())
                    .toUri();
            return ResponseEntity.created(location).body(user);
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @PatchMapping(value = "/api/users", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> modify(@RequestBody User user) {
        if(userRepository.findByEmail(user.getEmail()) != null) {
            userService.addWithDefaultRole(user);
            User saved = userRepository.save(user);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

}
