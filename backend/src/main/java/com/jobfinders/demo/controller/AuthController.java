package com.jobfinders.demo.controller;

import com.jobfinders.demo.dto.LoginRequest;
import com.jobfinders.demo.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.jobfinders.demo.repository.UserRepository;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:8000", "http://127.0.0.1:8000", "http://localhost:3000"})
public class AuthController {

    private static final String ERROR_KEY = "error";
    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/signin")
    public ResponseEntity<Map<String, Object>> authenticateUser(@RequestBody LoginRequest loginRequest) {
        try {
            var userOpt = userRepository.findByUsername(loginRequest.getUsername());
            if (userOpt.isPresent()) {
                User user = userOpt.get();
                // Simple password check (in production, use BCrypt)
                if (user.getPassword().equals(loginRequest.getPassword())) {
                    String dummyToken = "dummy-jwt-token-for-" + user.getUsername();
                    Map<String, Object> response = new HashMap<>();
                    response.put("token", dummyToken);
                    response.put("id", user.getId());
                    response.put("username", user.getUsername());
                    response.put("email", user.getEmail());
                    response.put("fullName", user.getFullName());
                    response.put("roles", user.getRole().name());
                    return ResponseEntity.ok(response);
                }
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of(ERROR_KEY, "Invalid credentials"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of(ERROR_KEY, "Authentication failed: " + e.getMessage()));
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> registerUser(@RequestBody User signUpRequest) {
        try {
            // Check if username already exists
            if (userRepository.findByUsername(signUpRequest.getUsername()).isPresent()) {
                return ResponseEntity.badRequest()
                    .body(Map.of(ERROR_KEY, "Username already exists"));
            }
            
            // Check if email already exists
            if (userRepository.findByEmail(signUpRequest.getEmail()).isPresent()) {
                return ResponseEntity.badRequest()
                    .body(Map.of(ERROR_KEY, "Email already exists"));
            }
            
            // Set default role if not specified
            if (signUpRequest.getRole() == null) {
                signUpRequest.setRole(User.UserRole.USER);
            }            User savedUser = userRepository.save(signUpRequest);
            
            // Generate token for immediate login after registration
            String dummyToken = "dummy-jwt-token-for-" + savedUser.getUsername();
            
            Map<String, Object> response = new HashMap<>();
            response.put("token", dummyToken);
            response.put("id", savedUser.getId());
            response.put("username", savedUser.getUsername());
            response.put("email", savedUser.getEmail());
            response.put("fullName", savedUser.getFullName());
            response.put("roles", savedUser.getRole().name());
            response.put("message", "User registered successfully!");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of(ERROR_KEY, "Registration failed: " + e.getMessage()));
        }
    }
}
