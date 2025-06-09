package com.jobfinders.demo.repository;

import com.jobfinders.demo.model.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    
    Page<Job> findByStatus(Job.JobStatus status, Pageable pageable);
    
    Page<Job> findByCompanyId(Long companyId, Pageable pageable);
    
    Page<Job> findByTitleContainingIgnoreCase(String title, Pageable pageable);
    
    Page<Job> findByLocationContainingIgnoreCase(String location, Pageable pageable);
    
    List<Job> findByType(Job.JobType type);
    
    List<Job> findByExperienceLevel(Job.ExperienceLevel experienceLevel);
    
    @Query("SELECT j FROM Job j WHERE " +
           "(:keyword IS NULL OR LOWER(j.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(j.description) LIKE LOWER(CONCAT('%', :keyword, '%'))) AND " +
           "(:location IS NULL OR LOWER(j.location) LIKE LOWER(CONCAT('%', :location, '%'))) AND " +
           "(:type IS NULL OR j.type = :type) AND " +
           "j.status = 'ACTIVE'")
    Page<Job> searchJobs(@Param("keyword") String keyword, 
                        @Param("location") String location, 
                        @Param("type") Job.JobType type, 
                        Pageable pageable);
}
