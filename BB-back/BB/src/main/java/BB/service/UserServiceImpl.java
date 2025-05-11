package BB.service;

import BB.model.User;
import BB.repository.UserRepository;
import BB.security.JwtUtil;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public UserServiceImpl(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public User saveUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        return userRepository.save(user);
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public String validateUser(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) return "401::Invalid Credentials";

        User user = userOpt.get();
        if (!user.getPassword().equals(password)) {
            return "401::Invalid Credentials";
        }
        if (!user.isVerified()) {
            return "401::Account not verified";
        }

        String token = jwtUtil.generateToken(email);
        return "200::" + token;
    }
}