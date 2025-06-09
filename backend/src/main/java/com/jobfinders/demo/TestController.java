package com.jobfinders.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://localhost:8000", "http://127.0.0.1:8000", "http://localhost:3000"})
public class TestController {

    @GetMapping("/")
    public Map<String, String> home() {
        return Map.of(
            "message", "JobFinder API is running!",
            "status", "OK",
            "version", "1.0.0"
        );
    }
    
    @GetMapping("/test")
    public Map<String, String> test() {
        return Map.of(
            "message", "Test endpoint working!",
            "timestamp", String.valueOf(System.currentTimeMillis())
        );
    }
    
    @GetMapping("/api")
    public Map<String, Object> apiInfo() {
        return Map.of(
            "name", "JobFinder API",
            "version", "1.0.0",
            "endpoints", Map.of(
                "auth", "/api/auth (POST /signin, /signup)",
                "jobs", "/api/jobs (GET, POST, PUT, DELETE)",
                "companies", "/api/companies (GET, POST, PUT, DELETE)",
                "users", "/api/users (GET, PUT)"
            )
        );
    }
}
