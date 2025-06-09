// API Configuration
const API_CONFIG = {
    BASE_URL: 'http://localhost:8080/api',    ENDPOINTS: {
        AUTH: {
            LOGIN: '/auth/signin',
            REGISTER: '/auth/signup'
        },
        JOBS: {
            ALL: '/jobs',
            SEARCH: '/jobs/search',
            BY_ID: '/jobs',
            BY_KEYWORD: '/jobs/keyword',
            BY_COMPANY: '/jobs/company'
        },
        COMPANIES: {
            ALL: '/companies',
            SEARCH: '/companies/search',
            BY_ID: '/companies'
        },
        USERS: {
            PROFILE: '/users/profile',
            BY_ID: '/users',
            BY_USERNAME: '/users/username',
            CHANGE_PASSWORD: '/users'
        }
    }
};

// Authentication state
let authState = {
    isAuthenticated: false,
    token: null,
    user: null
};

// Utility function to make authenticated API calls
async function apiCall(endpoint, options = {}) {
    const url = `${API_CONFIG.BASE_URL}${endpoint}`;
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        },
        ...options
    };

    // Add auth token if available
    if (authState.token) {
        config.headers['Authorization'] = `Bearer ${authState.token}`;
    }

    try {
        const response = await fetch(url, config);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error('API call failed:', error);
        return { success: false, error: error.message };
    }
}

// Authentication functions
async function login(username, password) {
    const result = await apiCall(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
        method: 'POST',
        body: JSON.stringify({ username, password })
    });

    if (result.success) {
        authState.isAuthenticated = true;
        authState.token = result.data.token;
        authState.user = {
            id: result.data.id,
            username: result.data.username,
            email: result.data.email,
            fullName: result.data.fullName,
            role: result.data.role
        };
          // Store in localStorage for persistence
        localStorage.setItem('auth_token', authState.token);
        localStorage.setItem('user_data', JSON.stringify(authState.user));
        
        return { success: true, user: authState.user };
    }
    
    return result;
}

async function register(userData) {
    const result = await apiCall(API_CONFIG.ENDPOINTS.AUTH.REGISTER, {
        method: 'POST',
        body: JSON.stringify(userData)
    });
    
    return result;
}

function logout() {
    authState.isAuthenticated = false;
    authState.token = null;
    authState.user = null;
    
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    
    // Redirect to home page
    window.location.href = '../index.html';
}

// Check for existing authentication on page load
function initAuth() {
    const token = localStorage.getItem('auth_token');
    const user = localStorage.getItem('user_data');
    
    if (token && user) {
        authState.isAuthenticated = true;
        authState.token = token;
        authState.user = JSON.parse(user);
    }
}

// Jobs API functions
async function fetchJobs(params = {}) {
    const queryParams = new URLSearchParams();
    
    Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
            queryParams.append(key, params[key]);
        }
    });
    
    const endpoint = `${API_CONFIG.ENDPOINTS.JOBS.ALL}${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    return await apiCall(endpoint);
}

async function searchJobs(searchParams) {
    const queryParams = new URLSearchParams();
    
    Object.keys(searchParams).forEach(key => {
        if (searchParams[key] !== null && searchParams[key] !== undefined && searchParams[key] !== '') {
            queryParams.append(key, searchParams[key]);
        }
    });
    
    const endpoint = `${API_CONFIG.ENDPOINTS.JOBS.SEARCH}?${queryParams.toString()}`;
    return await apiCall(endpoint);
}

async function searchJobsByKeyword(keyword, params = {}) {
    const queryParams = new URLSearchParams({ keyword, ...params });
    const endpoint = `${API_CONFIG.ENDPOINTS.JOBS.BY_KEYWORD}?${queryParams.toString()}`;
    return await apiCall(endpoint);
}

async function fetchJobById(id) {
    return await apiCall(`${API_CONFIG.ENDPOINTS.JOBS.BY_ID}/${id}`);
}

async function fetchJobsByCompany(companyId) {
    return await apiCall(`${API_CONFIG.ENDPOINTS.JOBS.BY_COMPANY}/${companyId}`);
}

// Companies API functions
async function fetchCompanies(params = {}) {
    const queryParams = new URLSearchParams();
    
    Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
            queryParams.append(key, params[key]);
        }
    });
    
    const endpoint = `${API_CONFIG.ENDPOINTS.COMPANIES.ALL}${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    return await apiCall(endpoint);
}

async function searchCompanies(searchParams) {
    const queryParams = new URLSearchParams();
    
    Object.keys(searchParams).forEach(key => {
        if (searchParams[key] !== null && searchParams[key] !== undefined && searchParams[key] !== '') {
            queryParams.append(key, searchParams[key]);
        }
    });
    
    const endpoint = `${API_CONFIG.ENDPOINTS.COMPANIES.SEARCH}?${queryParams.toString()}`;
    return await apiCall(endpoint);
}

async function fetchCompanyById(id) {
    return await apiCall(`${API_CONFIG.ENDPOINTS.COMPANIES.BY_ID}/${id}`);
}

// User Profile API functions
const UserAPI = {
    async getCurrentProfile() {
        const response = await apiCall(API_CONFIG.ENDPOINTS.USERS.PROFILE);
        
        if (response.success) {
            return response.data;
        }
        
        throw new Error(response.error || 'Failed to fetch profile');
    },

    async updateProfile(profileData) {
        const response = await apiCall(API_CONFIG.ENDPOINTS.USERS.PROFILE, {
            method: 'PUT',
            body: JSON.stringify(profileData)
        });
        
        if (response.success) {
            return response.data;
        }
        
        throw new Error(response.error || 'Failed to update profile');
    },

    async getUserById(userId) {
        const response = await apiCall(`${API_CONFIG.ENDPOINTS.USERS.BY_ID}/${userId}`);
        
        if (response.success) {
            return response.data;
        }
        
        throw new Error(response.error || 'Failed to fetch user');
    },

    async getUserByUsername(username) {
        const response = await apiCall(`${API_CONFIG.ENDPOINTS.USERS.BY_USERNAME}/${username}`);
        
        if (response.success) {
            return response.data;
        }
        
        throw new Error(response.error || 'Failed to fetch user');
    },

    async changePassword(userId, newPassword) {
        const response = await apiCall(`${API_CONFIG.ENDPOINTS.USERS.CHANGE_PASSWORD}/${userId}/change-password`, {
            method: 'POST',
            body: JSON.stringify({ newPassword })
        });
        
        if (response.success) {
            return response.data;
        }
        
        throw new Error(response.error || 'Failed to change password');
    }
};

// Utility functions for UI
function showLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = '<div class="flex justify-center items-center py-8"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>';
    }
}

function showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = `
            <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <p class="font-medium">Error</p>
                <p class="text-sm">${message}</p>
            </div>
        `;
    }
}

function formatSalary(min, max) {
    if (!min && !max) return 'Salary not specified';
    if (min && max) return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
    if (min) return `From $${min.toLocaleString()}`;
    if (max) return `Up to $${max.toLocaleString()}`;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function timeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    
    return formatDate(dateString);
}

// Initialize authentication when script loads (called manually by pages)
// Removed automatic DOMContentLoaded to avoid conflicts with page-specific initialization

function updateAuthUI() {
    if (authState.isAuthenticated) {
        showAuthenticatedState();
    } else {
        showGuestState();
    }
}

function showAuthenticatedState() {
    // Hide guest navigation
    hideElement('loginBtn');
    hideElement('registerBtn');
    hideElement('guest-nav');
    hideElement('mobile-loginBtn');
    hideElement('mobile-registerBtn');
    hideElement('mobile-guest-nav');
    
    // Show user menu
    showElement('userMenu');
    showElement('mobile-userMenu');
    
    // Update profile names
    const userName = authState.user?.fullName || authState.user?.username || 'User';
    updateElementText('profileBtn', userName);
    updateElementText('mobile-profileBtn', userName);
    
    // Add logout functionality
    addLogoutHandlers();
}

function showGuestState() {
    // Show guest navigation
    showElement('loginBtn');
    showElement('registerBtn');
    showElement('guest-nav');
    showElement('mobile-loginBtn');
    showElement('mobile-registerBtn');
    showElement('mobile-guest-nav');
    
    // Hide user menu
    hideElement('userMenu');
    hideElement('mobile-userMenu');
}

function hideElement(id) {
    const element = document.getElementById(id);
    if (element) {
        element.style.display = 'none';
        element.classList.add('hidden');
    }
}

function showElement(id) {
    const element = document.getElementById(id);
    if (element) {
        element.style.display = element.id.includes('userMenu') ? 'flex' : 'block';
        element.classList.remove('hidden');
    }
}

function updateElementText(id, text) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = text;
    }
}

function addLogoutHandlers() {
    const logoutBtn = document.getElementById('logoutBtn');
    const mobileLogoutBtn = document.getElementById('mobile-logoutBtn');
    
    if (logoutBtn) {
        logoutBtn.onclick = () => AuthAPI.logout();
    }
    if (mobileLogoutBtn) {
        mobileLogoutBtn.onclick = () => AuthAPI.logout();
    }
}

// Initialize authentication state from localStorage
function initializeAuth() {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');
    
    if (token && userData) {
        try {
            authState.token = token;
            authState.user = JSON.parse(userData);
            authState.isAuthenticated = true;
        } catch (error) {
            console.error('Error parsing stored user data:', error);
            clearAuthState();
        }
    }
}

function clearAuthState() {
    authState.isAuthenticated = false;
    authState.token = null;
    authState.user = null;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
}

// Enhanced Auth API
const AuthAPI = {
    async login(username, password) {
        const response = await apiCall(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
            method: 'POST',
            body: JSON.stringify({ username, password })
        });

        if (response.success && response.data && response.data.token) {
            authState.isAuthenticated = true;
            authState.token = response.data.token;

            // Corrected user object mapping:
            authState.user = {
                id: response.data.id,
                username: response.data.username,
                email: response.data.email,
                fullName: response.data.fullName,
                roles: response.data.roles // Assumes 'roles' is the field from backend
            };
            
            // Check if essential user fields are present
            if (authState.user.id && authState.user.username) {
                localStorage.setItem('auth_token', authState.token);
                localStorage.setItem('user_data', JSON.stringify(authState.user));
                return { token: authState.token, user: authState.user };
            } else {
                console.error('Login successful but user data from backend is incomplete.', response.data);
                clearAuthState(); 
                throw new Error('Login succeeded but received incomplete user data from server.');
            }
        } else if (response.success && (!response.data || !response.data.token)) {
            console.error('Login successful (HTTP 200) but token or data missing in response body.', response.data);
            clearAuthState();
            throw new Error('Login response from server was incomplete.');
        }

        throw new Error(response.error || 'Login failed');
    },    async register(userData) {
        const response = await apiCall(API_CONFIG.ENDPOINTS.AUTH.REGISTER, {
            method: 'POST',
            body: JSON.stringify(userData)
        });

        if (response.success) {
            authState.isAuthenticated = true;
            authState.token = response.data.token;
            authState.user = response.data.user;
            
            // Store in localStorage for persistence
            localStorage.setItem('auth_token', authState.token);
            localStorage.setItem('user_data', JSON.stringify(authState.user));
            
            return { token: authState.token, user: authState.user };
        }
        
        throw new Error(response.error || 'Registration failed');
    },

    logout() {
        clearAuthState();
        window.location.href = '../index.html';
    },

    getCurrentUser() {
        return authState.user;
    },

    isAuthenticated() {
        return authState.isAuthenticated;
    }
};

// Enhanced Job API
const JobAPI = {
    async getAllJobs(filters = {}) {
        let endpoint = API_CONFIG.ENDPOINTS.JOBS.ALL;
        const params = new URLSearchParams();
        
        if (filters.keyword) params.append('keyword', filters.keyword);
        if (filters.location) params.append('location', filters.location);
        if (filters.type) params.append('type', filters.type);
        if (filters.page) params.append('page', filters.page);
        if (filters.size) params.append('size', filters.size);
        
        if (params.toString()) {
            endpoint += `?${params.toString()}`;
        }

        const response = await apiCall(endpoint);
        
        if (response.success) {
            return response.data;
        }
        
        throw new Error(response.error || 'Failed to fetch jobs');
    },

    async getJobById(jobId) {
        const response = await apiCall(`${API_CONFIG.ENDPOINTS.JOBS.BY_ID}/${jobId}`);
        
        if (response.success) {
            return response.data;
        }
        
        throw new Error(response.error || 'Failed to fetch job');
    },

    async searchJobs(keyword, location = '', page = 0, size = 20) {
        const params = new URLSearchParams({
            keyword,
            page,
            size
        });
        
        if (location) params.append('location', location);
        
        const response = await apiCall(`${API_CONFIG.ENDPOINTS.JOBS.SEARCH}?${params.toString()}`);
        
        if (response.success) {
            return response.data;
        }
        
        throw new Error(response.error || 'Failed to search jobs');
    },

    async getJobsByCompany(companyId, page = 0, size = 20) {
        const params = new URLSearchParams({ page, size });
        const response = await apiCall(`${API_CONFIG.ENDPOINTS.JOBS.BY_COMPANY}/${companyId}?${params.toString()}`);
        
        if (response.success) {
            return response.data;
        }
        
        throw new Error(response.error || 'Failed to fetch company jobs');
    }
};

// Enhanced Company API
const CompanyAPI = {
    async getAllCompanies(filters = {}) {
        let endpoint = API_CONFIG.ENDPOINTS.COMPANIES.ALL;
        const params = new URLSearchParams();
        
        if (filters.name) params.append('name', filters.name);
        if (filters.industry) params.append('industry', filters.industry);
        if (filters.size) params.append('size', filters.size);
        if (filters.page) params.append('page', filters.page);
        
        if (params.toString()) {
            endpoint += `?${params.toString()}`;
        }

        const response = await apiCall(endpoint);
        
        if (response.success) {
            return response.data;
        }
        
        throw new Error(response.error || 'Failed to fetch companies');
    },

    async getCompanyById(companyId) {
        const response = await apiCall(`${API_CONFIG.ENDPOINTS.COMPANIES.BY_ID}/${companyId}`);
        
        if (response.success) {
            return response.data;
        }
        
        throw new Error(response.error || 'Failed to fetch company');
    },

    async searchCompanies(searchTerm, page = 0, size = 20) {
        const params = new URLSearchParams({
            name: searchTerm,
            page,
            size
        });
        
        const response = await apiCall(`${API_CONFIG.ENDPOINTS.COMPANIES.SEARCH}?${params.toString()}`);
        
        if (response.success) {
            return response.data;
        }
        
        throw new Error(response.error || 'Failed to search companies');
    }
};
