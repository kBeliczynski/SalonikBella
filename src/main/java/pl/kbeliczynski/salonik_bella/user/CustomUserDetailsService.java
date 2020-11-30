package pl.kbeliczynski.salonik_bella.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class CustomUserDetailsService implements UserDetailsService {
private UserRepository userRepository;

	@Autowired
	public void setUserRepository(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByEmail(username);
		if(user == null)
			throw new UsernameNotFoundException("User not found");
		org.springframework.security.core.userdetails.User userDetails =
				new org.springframework.security.core.userdetails.User(
						user.getEmail(),
						user.getPassword(),
                        convertAuthorities(user.getRole()));
		return userDetails;
	}

	private Set<GrantedAuthority> convertAuthorities(UserRole userRoles) {
		Set<GrantedAuthority> authorities = new HashSet<>();
		authorities.add(new SimpleGrantedAuthority(userRoles.getRole()));
		return authorities;
	}

}
