// BB/controller/AuthController.java
package BB.controller;

import BB.model.User;
import BB.security.JwtUtil;
import BB.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
//@CrossOrigin(origins = "http://localhost:5173")
@CrossOrigin(origins = "https://billbuddy-kappa.vercel.app")
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public AuthController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        User savedUser = userService.saveUser(user);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Registration successful. Please check your email for verification.");
        
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String result = userService.validateUser(credentials.get("email"), credentials.get("password"));

        String[] parts = result.split("::");
        if (parts[0].equals("200")) {
            Map<String, String> response = new HashMap<>();
            response.put("token", parts[1]);
            return ResponseEntity.ok(response);
        } else {
            // Return JSON even in error
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", parts[1]);
            return ResponseEntity.status(401).body(errorResponse);
        }
    }
}