package pl.kbeliczynski.salonik_bella.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import pl.kbeliczynski.salonik_bella.user.User;
import pl.kbeliczynski.salonik_bella.user.UserRepository;

import java.security.Principal;

@Controller
public class AuthenticationController {
    @Autowired
    UserRepository userRepository;

     @PostMapping("/login")
     @ResponseBody
     public User login(Principal user) { // Principal posiada informację o tym czy obiekt jest uwieżytelniony, uzywamy go aby uzyskac dostep do danych aktualnie zalogowanego usera
         User userDetails = userRepository.findByEmail(user.getName());
         return userDetails;
     }

}
