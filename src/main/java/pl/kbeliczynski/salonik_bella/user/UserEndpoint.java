package pl.kbeliczynski.salonik_bella.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import pl.kbeliczynski.salonik_bella.PerfumeServices.PerfumeRepository;
import pl.kbeliczynski.salonik_bella.productServices.ProductRepository;

import java.net.URI;
import java.util.List;
import java.util.Optional;

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
         return userRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
     }

    @PostMapping(value = "/api/users", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> save(@RequestBody User user) {
        if(isLoginAvailable(user.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } else if(user.getId() == null) {
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

    @PutMapping("/api/users/{id}")
    public ResponseEntity<User> update(@RequestBody User user, @PathVariable Long id) {
        Optional<User> newUser = userRepository.findById(id);
        if(user.getPassword() == null){
            userService.addWithDefaultRole(user);
            newUser.get().setPassword(user.getPassword());
        }else if(user.getPassword().compareTo(newUser.get().getPassword()) != 0){
            userService.setPasswordEncoder(user);
            newUser.get().setPassword(user.getPassword());
        } else {
            newUser.get().setPerfumeList(user.getPerfumeList());
            newUser.get().setProductList(user.getProductList());
            newUser.get().setVisitList(user.getVisitList());
        }
        User saved = userRepository.save(newUser.get());
        URI location = ServletUriComponentsBuilder
                    .fromCurrentRequest()
                    .path("/{id}")
                    .buildAndExpand(saved.getId())
                    .toUri();
            return ResponseEntity.created(location).body(user);
    }

    Boolean isLoginAvailable(String email){
        return userRepository.existsByEmail(email);
    }


}
