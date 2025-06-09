// Admin Data Insert JavaScript
// This file handles the admin interface for inserting test data into the database

// API Configuration for admin operations
const ADMIN_API_CONFIG = {
    BASE_URL: 'http://localhost:8080/api',
    ENDPOINTS: {
        AUTH: {
            REGISTER: '/auth/signup',
            LOGIN: '/auth/signin'
        },
        USERS: {
            ALL: '/users',
            BY_ID: '/users',
            BY_USERNAME: '/users/username'
        },
        HEALTH: '/health'
    }
};

// Utility function for API calls
async function adminApiCall(endpoint, options = {}) {
    const url = `${ADMIN_API_CONFIG.BASE_URL}${endpoint}`;
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        },
        ...options
    };

    // Add JWT token to headers if available
    const token = localStorage.getItem('adminToken');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(url, config);
        
        let data;
        const contentType = response.headers.get('content-type');
        
        if (contentType?.includes('application/json')) { // Used optional chaining here
            data = await response.json();
        } else {
            data = await response.text(); 
        }
        
        return { 
            success: response.ok, 
            data: data,
            status: response.status,
            statusText: response.statusText
        };
    } catch (error) {
        console.error('Admin API call failed:', error);
        return { 
            success: false, 
            error: error.message,
            status: 0,
            statusText: 'Network Error'
        };
    }
}

// DOM Elements
let userForm, resultsDiv, resultContent, generateRandomBtn, checkApiBtn, apiStatusDiv, loadUsersBtn, testConnectionBtn, usersPreviewDiv;
let loginForm, loginStatusDiv, adminContentDiv, adminUsernameInput, adminPasswordInput;

// Initialize the admin interface
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    attachEventListeners();
    checkAdminAuth(); // Check auth status on load
});

function initializeElements() {
    userForm = document.getElementById('userForm');
    resultsDiv = document.getElementById('results');
    resultContent = document.getElementById('resultContent');
    generateRandomBtn = document.getElementById('generateRandomUser');
    checkApiBtn = document.getElementById('checkApiStatus');
    apiStatusDiv = document.getElementById('apiStatus');

    // Login elements
    loginForm = document.getElementById('loginForm');
    loginStatusDiv = document.getElementById('loginStatus');
    adminContentDiv = document.getElementById('adminContent');
    adminUsernameInput = document.getElementById('adminUsername');
    adminPasswordInput = document.getElementById('adminPassword');

    loadUsersBtn = document.getElementById('loadUsersBtn'); 
    testConnectionBtn = document.getElementById('testConnectionBtn');
    usersPreviewDiv = document.getElementById('usersPreviewDiv');
}

function attachEventListeners() {
    if (loginForm) {
        loginForm.addEventListener('submit', handleAdminLogin);
    }
    if (userForm) {
        userForm.addEventListener('submit', function(event) {
            event.preventDefault();
            console.log("User form submitted (placeholder)");
        });
    }
    if (generateRandomBtn) {
        generateRandomBtn.addEventListener('click', function() {
            console.log("Generate random user clicked (placeholder)");
        });
    }
    if (checkApiBtn) {
        checkApiBtn.addEventListener('click', async function() {
            console.log("Check API status clicked (placeholder)");
            const healthEndpoint = ADMIN_API_CONFIG.ENDPOINTS.HEALTH;
            const response = await adminApiCall(healthEndpoint);
            if (apiStatusDiv) {
                apiStatusDiv.textContent = response.success ? `API Status: ${response.data} (${response.status})` : `API Status: Error - ${response.error || response.statusText}`;
            }
        });
    }
}

async function handleAdminLogin(event) {
    event.preventDefault();
    if (!adminUsernameInput || !adminPasswordInput || !loginStatusDiv) return;

    const username = adminUsernameInput.value;
    const password = adminPasswordInput.value;

    loginStatusDiv.textContent = 'Logging in...';

    const response = await adminApiCall(ADMIN_API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
        method: 'POST',
        body: JSON.stringify({ username, password })
    });

    if (response.success && response.data.token) {
        localStorage.setItem('adminToken', response.data.token);
        loginStatusDiv.textContent = 'Login successful!';
        showAdminContent(true);
    } else {
        localStorage.removeItem('adminToken');
        loginStatusDiv.textContent = `Login failed: ${response.data ? response.data.message : (response.error || response.statusText)}`;
        showAdminContent(false);
    }
}

function checkAdminAuth() {
    const token = localStorage.getItem('adminToken');
    if (token) {
        showAdminContent(true);
    } else {
        showAdminContent(false);
    }
}

function showAdminContent(isLoggedIn) {
    const loginSection = document.getElementById('loginSection');
    if (loginSection) loginSection.style.display = isLoggedIn ? 'none' : 'block';
    if (adminContentDiv) adminContentDiv.style.display = isLoggedIn ? 'block' : 'none';
    
    if (isLoggedIn) {
        showWelcomeMessage();
    }
}


function showWelcomeMessage() {
    if (resultContent) {
        resultContent.innerHTML = '<p>Welcome to the Admin Data Insertion Panel. Use the form to add new test users or generate random ones.</p>';
    } else {
        console.log("Welcome to Admin Panel (resultContent not found for message)");
    }
}

async function createTestUser(userData) {
    if (!localStorage.getItem('adminToken')) {
        console.error("Admin not logged in.");
        if(resultsDiv) resultsDiv.textContent = "Admin not logged in. Please login first.";
        return;
    }
    const response = await adminApiCall(ADMIN_API_CONFIG.ENDPOINTS.USERS.ALL, {
        method: 'POST',
        body: JSON.stringify(userData)
    });

    if (resultsDiv && resultContent) {
        if (response.success) {
            resultContent.textContent = JSON.stringify(response.data, null, 2);
            resultsDiv.className = 'success';
        } else {
            resultContent.textContent = `Error: ${response.data ? response.data.message : (response.error || response.statusText)}`;
            resultsDiv.className = 'error';
        }
    } else {
        console.log("Result display elements not found.");
    }
}

// Generate random test user
async function generateRandomUser() {
    const randomId = Date.now();
    const randomNames = [
        'John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson', 'David Brown',
        'Emily Davis', 'Chris Miller', 'Amanda Garcia', 'Tom Anderson', 'Lisa Martinez'
    ];
    
    const randomUsernames = [
        'developer', 'engineer', 'designer', 'manager', 'analyst',
        'specialist', 'coordinator', 'consultant', 'administrator', 'technician'
    ];
    
    const randomLocations = [
        'New York, NY', 'San Francisco, CA', 'Chicago, IL', 'Austin, TX', 'Seattle, WA',
        'Boston, MA', 'Los Angeles, CA', 'Denver, CO', 'Atlanta, GA', 'Miami, FL'
    ];
    
    const randomBios = [
        'Experienced professional with a passion for innovation.',
        'Dedicated team player with strong technical skills.',
        'Creative problem solver with excellent communication abilities.',
        'Results-driven individual with leadership experience.',
        'Detail-oriented professional with analytical mindset.'
    ];

    const roles = ['USER', 'EMPLOYER', 'ADMIN'];
    
    const fullName = randomNames[Math.floor(Math.random() * randomNames.length)];
    const usernameBase = randomUsernames[Math.floor(Math.random() * randomUsernames.length)];
    const username = `${usernameBase}_${randomId}`;
    const email = `${username}@test.com`;
    const password = 'password123';
    const location = randomLocations[Math.floor(Math.random() * randomLocations.length)];
    const bio = randomBios[Math.floor(Math.random() * randomBios.length)];
    const phone = `+1 (555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;

    // Fill the form with random data
    document.getElementById('username').value = username;
    document.getElementById('email').value = email;
    document.getElementById('password').value = password;
    document.getElementById('fullName').value = fullName;
    document.getElementById('phone').value = phone;
    document.getElementById('location').value = location;
    document.getElementById('bio').value = bio;
    
    // Set random role
    const roleSelect = document.getElementById('role');
    roleSelect.value = roles[Math.floor(Math.random() * roles.length)];

    displayResult({
        type: 'info',
        title: 'Random Test Data Generated',
        message: 'Form has been filled with random test data. Click "Insert User" to create the user.',
        details: [
            `Generated Username: ${username}`,
            `Generated Email: ${email}`,
            `Password: ${password}`,
            `Full Name: ${fullName}`,
            '',
            'You can modify any field before submitting.'
        ]
    });
}

// Check API status
async function checkApiStatus() {
    showApiStatusLoading();
    
    const checks = [
        { name: 'Base API', endpoint: '', expected: 'API Response' },
        { name: 'Health Check', endpoint: '/health', expected: 'Health Status' },
        { name: 'Alternative Health', endpoint: '/api/health', expected: 'Health Status' },
        { name: 'Root Health', endpoint: '/', expected: 'Service Status' }
    ];
    
    const results = [];
    
    for (const check of checks) {
        try {
            const result = await adminApiCall(check.endpoint);
            results.push({
                name: check.name,
                status: result.success ? 'SUCCESS' : 'FAILED',
                statusCode: result.status,
                statusText: result.statusText,
                data: result.data,
                error: result.error
            });
        } catch (error) {
            results.push({
                name: check.name,
                status: 'ERROR',
                statusCode: 0,
                statusText: 'Network Error',
                error: error.message
            });
        }
    }
    
    displayApiStatus(results);
}

function displayApiStatus(results) {
    const successfulChecks = results.filter(r => r.status === 'SUCCESS').length;
    const totalChecks = results.length;
    
    let statusHtml = `
        <div class="bg-white rounded-lg border p-4">
            <h4 class="font-semibold text-lg mb-3">API Status Check Results</h4>
            <div class="mb-4">
                <span class="text-sm font-medium">Overall Status: </span>
                <span class="px-2 py-1 rounded text-sm ${successfulChecks > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                    ${successfulChecks}/${totalChecks} endpoints responding
                </span>
            </div>
            <div class="space-y-2">
    `;
    
    results.forEach(result => {
        const statusColor = result.status === 'SUCCESS' ? 'text-green-600' : 'text-red-600';
        const statusIcon = result.status === 'SUCCESS' ? '✅' : '❌';
        
        statusHtml += `
            <div class="border-l-4 ${result.status === 'SUCCESS' ? 'border-green-400' : 'border-red-400'} pl-3 py-2">
                <div class="flex items-center">
                    <span class="mr-2">${statusIcon}</span>
                    <span class="font-medium">${result.name}</span>
                    <span class="ml-auto ${statusColor}">${result.status}</span>
                </div>
                <div class="text-sm text-gray-600 mt-1">
                    Status: ${result.statusCode} ${result.statusText}
                </div>
                ${result.data ? `<div class="text-xs text-gray-500 mt-1">Response: ${JSON.stringify(result.data).substring(0, 100)}...</div>` : ''}
                ${result.error ? `<div class="text-xs text-red-500 mt-1">Error: ${result.error}</div>` : ''}
            </div>
        `;
    });
    
    statusHtml += `
            </div>
            <div class="mt-4 text-sm text-gray-600">
                <strong>Backend URL:</strong> ${ADMIN_API_CONFIG.BASE_URL}<br>
                <strong>Check Time:</strong> ${new Date().toLocaleString()}
            </div>
        </div>
    `;
    
    apiStatusDiv.innerHTML = statusHtml;
}

// Load all users from the database
async function loadAllUsers() {
    showUsersLoading();
    
    try {
        const result = await adminApiCall(ADMIN_API_CONFIG.ENDPOINTS.USERS.ALL);
        
        if (result.success && result.data) {
            displayUsers(result.data);
        } else {
            displayUsersError('Failed to load users. This endpoint requires admin authentication.', result);
        }
    } catch (error) {
        displayUsersError('Network error while loading users.', { error: error.message });
    }
}

// Test database connection by trying to fetch basic data
async function testDatabaseConnection() {
    showUsersLoading();
    
    const tests = [
        { name: 'Backend Health', endpoint: '/health' },
        { name: 'API Root', endpoint: '/' },
        { name: 'Users Endpoint', endpoint: '/users' }
    ];
    
    const results = [];
    
    for (const test of tests) {
        try {
            const result = await adminApiCall(test.endpoint);
            results.push({
                name: test.name,
                success: result.success,
                status: result.status,
                response: result.data
            });
        } catch (error) {
            results.push({
                name: test.name,
                success: false,
                error: error.message
            });
        }
    }
    
    displayConnectionTest(results);
}

function displayUsers(users) {
    if (!Array.isArray(users) || users.length === 0) {
        usersPreviewDiv.innerHTML = `
            <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p class="text-yellow-700">No users found in the database.</p>
            </div>
        `;
        return;
    }
    
    let usersHtml = `
        <div class="bg-white rounded-lg border p-4">
            <h4 class="font-semibold text-lg mb-3">Database Users (${users.length} total)</h4>
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                            <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Username</th>
                            <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                            <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Full Name</th>
                            <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                            <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
    `;
    
    users.slice(0, 10).forEach(user => { // Show first 10 users
        const createdDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A';
        usersHtml += `
            <tr class="hover:bg-gray-50">
                <td class="px-3 py-2 text-sm text-gray-900">${user.id || 'N/A'}</td>
                <td class="px-3 py-2 text-sm font-medium text-gray-900">${user.username || 'N/A'}</td>
                <td class="px-3 py-2 text-sm text-gray-600">${user.email || 'N/A'}</td>
                <td class="px-3 py-2 text-sm text-gray-600">${user.fullName || 'N/A'}</td>
                <td class="px-3 py-2 text-sm">
                    <span class="px-2 py-1 text-xs rounded ${getRoleColor(user.role)}">${user.role || 'USER'}</span>
                </td>
                <td class="px-3 py-2 text-sm text-gray-600">${createdDate}</td>
            </tr>
        `;
    });
    
    usersHtml += `
                    </tbody>
                </table>
            </div>
            ${users.length > 10 ? `<p class="mt-3 text-sm text-gray-500">Showing first 10 of ${users.length} users</p>` : ''}
            <div class="mt-4 text-sm text-gray-600">
                <strong>Note:</strong> Passwords are securely hashed and not displayed for security.
            </div>
        </div>
    `;
    
    usersPreviewDiv.innerHTML = usersHtml;
}

function displayUsersError(message, details) {
    usersPreviewDiv.innerHTML = `
        <div class="bg-red-50 border border-red-200 rounded-lg p-4">
            <div class="flex items-start">
                <span class="text-red-500 mr-2">❌</span>
                <div>
                    <p class="text-red-700 font-medium">${message}</p>
                    ${details ? `<p class="text-red-600 text-sm mt-1">Details: ${JSON.stringify(details)}</p>` : ''}
                    <div class="mt-3 text-sm text-red-600">
                        <p><strong>Possible reasons:</strong></p>
                        <ul class="list-disc list-inside mt-1">
                            <li>Backend server is not running</li>
                            <li>Database is not connected</li>
                            <li>Admin authentication required</li>
                            <li>CORS issues</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function displayConnectionTest(results) {
    const successfulTests = results.filter(r => r.success).length;
    const totalTests = results.length;
    
    let testHtml = `
        <div class="bg-white rounded-lg border p-4">
            <h4 class="font-semibold text-lg mb-3">Database Connection Test</h4>
            <div class="mb-4">
                <span class="text-sm font-medium">Connection Status: </span>
                <span class="px-2 py-1 rounded text-sm ${successfulTests > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                    ${successfulTests}/${totalTests} endpoints accessible
                </span>
            </div>
            <div class="space-y-2">
    `;
    
    results.forEach(result => {
        const statusColor = result.success ? 'text-green-600' : 'text-red-600';
        const statusIcon = result.success ? '✅' : '❌';
        
        testHtml += `
            <div class="border-l-4 ${result.success ? 'border-green-400' : 'border-red-400'} pl-3 py-2">
                <div class="flex items-center">
                    <span class="mr-2">${statusIcon}</span>
                    <span class="font-medium">${result.name}</span>
                    <span class="ml-auto ${statusColor}">${result.success ? 'CONNECTED' : 'FAILED'}</span>
                </div>
                ${result.status ? `<div class="text-sm text-gray-600 mt-1">Status: ${result.status}</div>` : ''}
                ${result.error ? `<div class="text-xs text-red-500 mt-1">Error: ${result.error}</div>` : ''}
            </div>
        `;
    });
    
    testHtml += `
            </div>
            <div class="mt-4 text-sm text-gray-600">
                <strong>Test Time:</strong> ${new Date().toLocaleString()}
            </div>
        </div>
    `;
    
    usersPreviewDiv.innerHTML = testHtml;
}

function showUsersLoading() {
    usersPreviewDiv.innerHTML = `
        <div class="bg-white rounded-lg border p-4">
            <div class="flex items-center">
                <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                <span>Loading data...</span>
            </div>
        </div>
    `;
}

function getRoleColor(role) {
    switch (role) {
        case 'ADMIN':
            return 'bg-red-100 text-red-800';
        case 'EMPLOYER':
            return 'bg-blue-100 text-blue-800';
        case 'USER':
        default:
            return 'bg-gray-100 text-gray-800';
    }
}

function showApiStatusLoading() {
    apiStatusDiv.innerHTML = `
        <div class="bg-white rounded-lg border p-4">
            <div class="flex items-center">
                <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                <span>Checking API status...</span>
            </div>
        </div>
    `;
}

// Display results with styling
function displayResult(result) {
    resultsDiv.classList.remove('hidden');
    
    const typeColors = {
        success: 'success',
        error: 'error',
        info: 'info'
    };
    
    const typeIcons = {
        success: '✅',
        error: '❌',
        info: 'ℹ️'
    };
    
    let detailsHtml = '';
    if (result.details && result.details.length > 0) {
        detailsHtml = `
            <div class="mt-3 pt-3 border-t border-gray-200">
                <div class="text-sm space-y-1">
                    ${result.details.map(detail => 
                        detail === '' ? '<br>' : `<div>${detail}</div>`
                    ).join('')}
                </div>
            </div>
        `;
    }
    
    resultContent.innerHTML = `
        <div class="result-box ${typeColors[result.type]}">
            <div class="flex items-start">
                <span class="text-xl mr-3">${typeIcons[result.type]}</span>
                <div class="flex-1">
                    <h4 class="font-semibold text-lg">${result.title}</h4>
                    <p class="mt-1">${result.message}</p>
                    ${detailsHtml}
                </div>
            </div>
        </div>
    `;
    
    // Scroll to results
    resultsDiv.scrollIntoView({ behavior: 'smooth' });
}

function showLoading() {
    displayResult({
        type: 'info',
        title: 'Creating User',
        message: 'Please wait while we create the user account...'
    });
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Export functions for global access
window.adminDataInsert = {
    handleUserFormSubmit,
    generateRandomUser,
    checkApiStatus,
    loadAllUsers,
    testDatabaseConnection,
    displayResult
};

// Also make available for debugging
window.adminApiCall = adminApiCall;
window.ADMIN_API_CONFIG = ADMIN_API_CONFIG;
