package com.jobfinders.demo.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "companies")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;
    
    private String description;
    private String website;
    private String logo;
    private String location;
    
    @Enumerated(EnumType.STRING)
    private Industry industry;
    
    @Enumerated(EnumType.STRING)
    private CompanySize size;
    
    @Column(name = "founded_year")
    private Integer foundedYear;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    public enum Industry {
        TECHNOLOGY, FINANCE, HEALTHCARE, EDUCATION, RETAIL,
        MANUFACTURING, CONSULTING, MEDIA, GOVERNMENT, NON_PROFIT,
        AUTOMOTIVE, AEROSPACE, ENERGY, TELECOMMUNICATIONS,
        REAL_ESTATE, HOSPITALITY, OTHER
    }
    
    public enum CompanySize {
        STARTUP, SMALL, MEDIUM, LARGE, ENTERPRISE
    }
}
