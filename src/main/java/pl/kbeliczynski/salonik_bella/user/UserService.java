package pl.kbeliczynski.salonik_bella.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private static final String DEFAULT_ROLE = "USER";
    private UserRepository userRepository;
	private UserRoleRepository roleRepository;
	private PasswordEncoder passwordEncoder;

	@Autowired
	public UserService(PasswordEncoder passwordEncoder) {
		super();
		this.passwordEncoder = passwordEncoder;
	}

	@Autowired
	public void setUserRepository(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Autowired
	public void setRoleRepository(UserRoleRepository roleRepository) {
		this.roleRepository = roleRepository;
	}

	public void addWithDefaultRole(User user) {
		user.setRole(roleRepository.findByRole(DEFAULT_ROLE));
		String passwordHash = passwordEncoder.encode(user.getPassword());
		user.setPassword(passwordHash);
	}

}
