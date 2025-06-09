// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize authentication state
    initializeAuth();
    updateAuthUI();
    
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Job search functionality (placeholder)
    const searchButton = document.querySelector('button');
    if (searchButton && searchButton.textContent.includes('Search Jobs')) {
        searchButton.addEventListener('click', function(e) {
            e.preventDefault();
            // Redirect to jobs page with search parameters
            window.location.href = 'pages/jobs.html';
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Job filtering and search functions (to be used across pages)
const JobFinder = {
    // Filter jobs by category
    filterByCategory: function(category) {
        // Implementation for job filtering
        console.log('Filtering by category:', category);
    },
    
    // Search jobs by keywords
    searchJobs: function(keywords, location) {
        // Implementation for job search
        console.log('Searching jobs:', keywords, location);
    },
    
    // Apply to job
    applyToJob: function(jobId) {
        // Implementation for job application
        console.log('Applying to job:', jobId);
    }
};

// Export for use in other pages
if (typeof module !== 'undefined' && module.exports) {
    module.exports = JobFinder;
}
