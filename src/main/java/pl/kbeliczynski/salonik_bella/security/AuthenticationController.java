package pl.kbeliczynski.salonik_bella.security;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.security.Principal;

@Controller
public class AuthenticationController {
     @PostMapping("/login")
     @ResponseBody
     public Principal login(Principal user) { // Principal posiada informację o tym czy obiekt jest uwieżytelniony
         return user;
     }
}
