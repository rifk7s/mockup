package com.jobfinders.demo.controller;

import com.jobfinders.demo.model.Job;
import com.jobfinders.demo.repository.JobRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = {"http://localhost:8000", "http://127.0.0.1:8000", "http://localhost:3000"})
public class JobController {

    private final JobRepository jobRepository;

    public JobController(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllJobs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "DESC") String sortDir) {
        
        try {
            Sort sort = sortDir.equalsIgnoreCase("DESC") ? 
                Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
            
            Pageable pageable = PageRequest.of(page, size, sort);
            Page<Job> jobs = jobRepository.findByStatus(Job.JobStatus.ACTIVE, pageable);
            
            Map<String, Object> response = new HashMap<>();
            response.put("content", jobs.getContent());
            response.put("totalElements", jobs.getTotalElements());
            response.put("totalPages", jobs.getTotalPages());
            response.put("currentPage", jobs.getNumber());
            response.put("size", jobs.getSize());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Failed to fetch jobs: " + e.getMessage()));
        }
    }    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getJobById(@PathVariable Long id) {
        try {
            return jobRepository.findById(id)
                .map(job -> {
                    Map<String, Object> response = new HashMap<>();
                    response.put("job", job);
                    return ResponseEntity.ok(response);
                })
                .orElse(ResponseEntity.status(404).body(Map.of("message", "Job not found")));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Failed to fetch job: " + e.getMessage()));
        }
    }

    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> searchJobs(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String type,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        
        try {
            Job.JobType jobType = null;
            if (type != null && !type.isEmpty()) {
                jobType = Job.JobType.valueOf(type.toUpperCase());
            }
            
            Pageable pageable = PageRequest.of(page, size, 
                Sort.by("createdAt").descending());
            
            Page<Job> jobs = jobRepository.searchJobs(keyword, location, jobType, pageable);
            
            Map<String, Object> response = new HashMap<>();
            response.put("content", jobs.getContent());
            response.put("totalElements", jobs.getTotalElements());
            response.put("totalPages", jobs.getTotalPages());
            response.put("currentPage", jobs.getNumber());
            response.put("size", jobs.getSize());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Failed to search jobs: " + e.getMessage()));
        }
    }

    @GetMapping("/keyword")
    public ResponseEntity<Map<String, Object>> searchJobsByKeyword(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        
        try {
            Pageable pageable = PageRequest.of(page, size, 
                Sort.by("createdAt").descending());
            
            Page<Job> jobs = jobRepository.findByTitleContainingIgnoreCase(keyword, pageable);
            
            Map<String, Object> response = new HashMap<>();
            response.put("content", jobs.getContent());
            response.put("totalElements", jobs.getTotalElements());
            response.put("totalPages", jobs.getTotalPages());
            response.put("currentPage", jobs.getNumber());
            response.put("size", jobs.getSize());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Failed to search jobs by keyword: " + e.getMessage()));
        }
    }

    @GetMapping("/company/{companyId}")
    public ResponseEntity<Map<String, Object>> getJobsByCompany(
            @PathVariable Long companyId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        
        try {
            Pageable pageable = PageRequest.of(page, size, 
                Sort.by("createdAt").descending());
            
            Page<Job> jobs = jobRepository.findByCompanyId(companyId, pageable);
            
            Map<String, Object> response = new HashMap<>();
            response.put("content", jobs.getContent());
            response.put("totalElements", jobs.getTotalElements());
            response.put("totalPages", jobs.getTotalPages());
            response.put("currentPage", jobs.getNumber());
            response.put("size", jobs.getSize());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Failed to fetch company jobs: " + e.getMessage()));
        }
    }
}
