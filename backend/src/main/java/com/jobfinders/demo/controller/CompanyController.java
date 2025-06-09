package com.jobfinders.demo.controller;

import com.jobfinders.demo.model.Company;
import com.jobfinders.demo.repository.CompanyRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/companies")
@CrossOrigin(origins = {"http://localhost:8000", "http://127.0.0.1:8000", "http://localhost:3000"})
public class CompanyController {

    private final CompanyRepository companyRepository;

    public CompanyController(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllCompanies(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "name") String sortBy,
            @RequestParam(defaultValue = "ASC") String sortDir) {
        
        try {
            Sort sort = sortDir.equalsIgnoreCase("DESC") ? 
                Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
            
            Pageable pageable = PageRequest.of(page, size, sort);
            Page<Company> companies = companyRepository.findAll(pageable);
            
            Map<String, Object> response = new HashMap<>();
            response.put("content", companies.getContent());
            response.put("totalElements", companies.getTotalElements());
            response.put("totalPages", companies.getTotalPages());
            response.put("currentPage", companies.getNumber());
            response.put("size", companies.getSize());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Failed to fetch companies: " + e.getMessage()));
        }
    }    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getCompanyById(@PathVariable Long id) {
        try {
            return companyRepository.findById(id)
                .map(company -> ResponseEntity.ok(Map.of("company", (Object)company)))
                .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(Map.of("error", (Object)("Failed to fetch company: " + e.getMessage())));
        }
    }

    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> searchCompanies(
            @RequestParam String name,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        
        try {
            Pageable pageable = PageRequest.of(page, size, 
                Sort.by("name").ascending());
            
            Page<Company> companies = companyRepository.searchCompanies(name, pageable);
            
            Map<String, Object> response = new HashMap<>();
            response.put("content", companies.getContent());
            response.put("totalElements", companies.getTotalElements());
            response.put("totalPages", companies.getTotalPages());
            response.put("currentPage", companies.getNumber());
            response.put("size", companies.getSize());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Failed to search companies: " + e.getMessage()));
        }
    }
}
