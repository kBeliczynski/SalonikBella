package pl.kbeliczynski.salonik_bella.orderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import pl.kbeliczynski.salonik_bella.PerfumeServices.PerfumeRepository;
import pl.kbeliczynski.salonik_bella.productServices.ProductRepository;
import pl.kbeliczynski.salonik_bella.user.UserRepository;
import pl.kbeliczynski.salonik_bella.user.UserRoleRepository;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
public class OrderEndpoint {
    private OrderRepository orderRepository;

    public OrderEndpoint(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @GetMapping("/api/orders")
    public List<Orders> getAll(){
        return orderRepository.findAll();
    }

    @GetMapping("/api/orders/{id}")
    public ResponseEntity<Orders> getById(@PathVariable Long id) {
        return orderRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping(value = "/api/orders")
    public ResponseEntity<Orders> save(@RequestBody Orders order) {
        if(order.getId() == null) {
            Orders saved = orderRepository.save(order);
            URI location = ServletUriComponentsBuilder
                    .fromCurrentRequest()
                    .path("/{id}")
                    .buildAndExpand(saved.getId())
                    .toUri();
            return ResponseEntity.created(location).body(order);
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @PutMapping("/api/orders/{id}")
    public ResponseEntity<Orders> update(@RequestBody Orders order, @PathVariable Long id) {
        System.out.println(order);
        Optional<Orders> newOrder = orderRepository.findById(id);
        newOrder.get().setStatus(order.getStatus());    //ustawia status zamówienia
        newOrder.get().setEndDate(order.getEndDate());
        Orders saved = orderRepository.save(newOrder.get());
        URI location = ServletUriComponentsBuilder
                    .fromCurrentRequest()
                    .path("/{id}")
                    .buildAndExpand(saved.getId())
                    .toUri();
            return ResponseEntity.created(location).body(order);
    }
}
