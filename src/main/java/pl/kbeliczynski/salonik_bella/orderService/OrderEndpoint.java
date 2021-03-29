package pl.kbeliczynski.salonik_bella.orderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.kbeliczynski.salonik_bella.PerfumeServices.PerfumeRepository;
import pl.kbeliczynski.salonik_bella.productServices.ProductRepository;
import pl.kbeliczynski.salonik_bella.user.UserRepository;
import pl.kbeliczynski.salonik_bella.user.UserRoleRepository;

import java.util.List;

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
}
