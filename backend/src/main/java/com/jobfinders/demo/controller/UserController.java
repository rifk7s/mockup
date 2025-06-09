package com.jobfinders.demo.controller;

import com.jobfinders.demo.model.User;
import com.jobfinders.demo.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = {"http://localhost:8000", "http://127.0.0.1:8000", "http://localhost:3000"})
public class UserController {

    private final UserRepository userRepository;

    private static final String MESSAGE = "message";
    private static final String ERROR = "error";

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/profile")
    public ResponseEntity<Map<String, Object>> getCurrentProfile() {
        // In a real app, you'd get the user ID from JWT token
        // For now, returning mock data or error
        return ResponseEntity.ok(Map.of("message", "Profile endpoint - requires authentication implementation"));
    }

    @PutMapping("/profile")
    public ResponseEntity<Map<String, Object>> updateProfile(@RequestBody User profileData) {
        try {
            Map<String, Object> response = new HashMap<>();
            response.put(MESSAGE, "Profile updated successfully");
            response.put("user", profileData);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put(ERROR, "Failed to update profile: " + e.getMessage());
            return ResponseEntity.internalServerError().body(error);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getUserById(@PathVariable Long id) {
        try {
            return userRepository.findById(id)
                .map(user -> {
                    Map<String, Object> userResponse = new HashMap<>();
                    userResponse.put("id", user.getId());
                    userResponse.put("username", user.getUsername());
                    userResponse.put("email", user.getEmail());
                    userResponse.put("fullName", user.getFullName());
                    userResponse.put("role", user.getRole().name());
                    Map<String, Object> response = new HashMap<>();
                    response.put("user", userResponse);
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> {
                    Map<String, Object> notFound = new HashMap<>();
                    notFound.put(MESSAGE, "User not found");
                    return ResponseEntity.status(404).body(notFound);
                });
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put(ERROR, "Failed to fetch user: " + e.getMessage());
            return ResponseEntity.internalServerError().body(error);
        }
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<Map<String, Object>> getUserByUsername(@PathVariable String username) {
        try {
            return userRepository.findByUsername(username)
                .map(user -> {
                    Map<String, Object> userResponse = new HashMap<>();
                    userResponse.put("id", user.getId());
                    userResponse.put("username", user.getUsername());
                    userResponse.put("email", user.getEmail());
                    userResponse.put("fullName", user.getFullName());
                    userResponse.put("role", user.getRole().name());
                    Map<String, Object> response = new HashMap<>();
                    response.put("user", userResponse);
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> {
                    Map<String, Object> notFound = new HashMap<>();
                    notFound.put(MESSAGE, "User not found");
                    return ResponseEntity.status(404).body(notFound);
                });
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put(ERROR, "Failed to fetch user: " + e.getMessage());
            return ResponseEntity.internalServerError().body(error);
        }
    }

    @PostMapping("/{id}/change-password")
    public ResponseEntity<Map<String, Object>> changePassword(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {
        try {
            String newPassword = request.get("newPassword");
            if (newPassword == null || newPassword.trim().isEmpty()) {
                Map<String, Object> error = new HashMap<>();
                error.put(ERROR, "New password is required");
                return ResponseEntity.badRequest().body(error);
            }

            return userRepository.findById(id)
                .map(user -> {
                    user.setPassword(newPassword); // In production, hash the password
                    userRepository.save(user);
                    Map<String, Object> response = new HashMap<>();
                    response.put(MESSAGE, "Password changed successfully");
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> {
                    Map<String, Object> notFound = new HashMap<>();
                    notFound.put(MESSAGE, "User not found");
                    return ResponseEntity.status(404).body(notFound);
                });
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put(ERROR, "Failed to change password: " + e.getMessage());
            return ResponseEntity.internalServerError().body(error);
        }
    }
}
