/**
 * MindConnect Mental Health Support Platform
 * Main JavaScript Application File
 * Supports SDG 3: Good Health and Well-being
 */

// Application State Management
let currentUser = null;
let userRegistrations = [];
let checkins = [];
let supportConnections = [];

/**
 * NAVIGATION FUNCTIONS
 */

/**
 * Show a specific page and hide others
 * @param {string} pageId - The ID of the page to show
 */
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update navigation active state
    updateNavigationState(pageId);
    
    // Close mobile menu if open
    closeMobileMenu();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Update navigation active state
 * @param {string} activePageId - The currently active page ID
 */
function updateNavigationState(activePageId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Find and activate current nav link
    const currentLink = document.querySelector(`[onclick="showPage('${activePageId}')"]`);
    if (currentLink) {
        currentLink.classList.add('active');
    }
}

/**
 * Toggle mobile menu visibility
 */
function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
}

/**
 * Close mobile menu
 */
function closeMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.remove('active');
}

/**
 * USER REGISTRATION FUNCTIONS
 */

/**
 * Initialize registration form event listener
 */
function initializeRegistrationForm() {
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', handleRegistration);
    }
}

/**
 * Handle user registration form submission
 * @param {Event} e - Form submission event
 */
function handleRegistration(e) {
    e.preventDefault();
    
    // Show loading state
    toggleRegistrationLoadingState(true);
    
    // Get form data
    const formData = new FormData(e.target);
    const userData = extractUserData(formData);
    
    // Simulate registration process
    setTimeout(() => {
        // Store user data
        userRegistrations.push(userData);
        currentUser = userData;
        
        // Reset loading state
        toggleRegistrationLoadingState(false);
        
        // Show success message
        showAlert('success', `Welcome to MindConnect, ${userData.fullName}! Your account has been created successfully.`);
        
        // Reset form
        e.target.reset();
        
        // Navigate to dashboard after brief delay
        setTimeout(() => {
            showPage('dashboard');
            updateDashboard();
        }, 2000);
        
    }, 2000);
}

/**
 * Extract user data from registration form
 * @param {FormData} formData - Form data object
 * @returns {Object} User data object
 */
function extractUserData(formData) {
    return {
        id: Date.now(),
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        age: formData.get('age'),
        location: formData.get('location'),
        supportTypes: formData.getAll('supportTypes'),
        urgencyLevel: formData.get('urgencyLevel'),
        additionalInfo: formData.get('additionalInfo'),
        registrationDate: new Date().toISOString(),
        privacy: formData.get('privacy'),
        newsletter: formData.get('newsletter')
    };
}

/**
 * Toggle registration button loading state
 * @param {boolean} isLoading - Whether to show loading state
 */
function toggleRegistrationLoadingState(isLoading) {
    const buttonText = document.getElementById('registerButtonText');
    const buttonLoader = document.getElementById('registerButtonLoader');
    
    if (buttonText && buttonLoader) {
        buttonText.style.display = isLoading ? 'none' : 'inline-block';
        buttonLoader.style.display = isLoading ? 'inline-block' : 'none';
    }
}

/**
 * SUPPORT SEARCH FUNCTIONS
 */

/**
 * Initialize support search form
 */
function initializeSupportSearchForm() {
    const supportSearchForm = document.getElementById('supportSearchForm');
    if (supportSearchForm) {
        supportSearchForm.addEventListener('submit', handleSupportSearch);
    }
}

/**
 * Handle support search form submission
 * @param {Event} e - Form submission event
 */
function handleSupportSearch(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const searchData = {
        location: formData.get('searchLocation'),
        type: formData.get('supportType'),
        format: formData.get('meetingFormat')
    };
    
    const locationText = searchData.location || 'your area';
    showAlert('success', `Searching for support options in ${locationText}...`);
    
    // Simulate search process
    setTimeout(() => {
        showAlert('success', 'Search completed! Here are the available support options in your area.');
        // In a real application, this would update the results display
        updateSupportResults(searchData);
    }, 1500);
}

/**
 * Update support search results (placeholder function)
 * @param {Object} searchData - Search parameters
 */
function updateSupportResults(searchData) {
    // In a real application, this would filter and display results
    console.log('Updating support results for:', searchData);
}

/**
 * DAILY CHECK-IN FUNCTIONS
 */

/**
 * Show daily check-in modal
 */
function showCheckInModal() {
    const modal = document.getElementById('checkinModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

/**
 * Close daily check-in modal
 */
function closeCheckinModal() {
    const modal = document.getElementById('checkinModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

/**
 * Initialize check-in form
 */
function initializeCheckinForm() {
    const checkinForm = document.getElementById('checkinForm');
    if (checkinForm) {
        checkinForm.addEventListener('submit', handleCheckin);
    }
}

/**
 * Handle check-in form submission
 * @param {Event} e - Form submission event
 */
function handleCheckin(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const checkinData = {
        id: Date.now(),
        date: new Date().toISOString(),
        mood: formData.get('moodRating'),
        activities: formData.getAll('activities'),
        notes: formData.get('notes')
    };
    
    // Store check-in data
    checkins.push(checkinData);
    
    showAlert('success', 'Check-in saved successfully! Keep up the great work.');
    closeCheckinModal();
    
    // Reset form
    e.target.reset();
    
    // Update dashboard if we're on it
    if (document.getElementById('dashboard').classList.contains('active')) {
        updateDashboard();
    }
}

/**
 * CRISIS SUPPORT FUNCTIONS
 */

/**
 * Show crisis support modal
 */
function showCrisisModal() {
    const modal = document.getElementById('crisisModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

/**
 * Close crisis support modal
 */
function closeCrisisModal() {
    const modal = document.getElementById('crisisModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

/**
 * Handle crisis line call
 */
function callCrisisLine() {
    if (confirm('This will call the Suicide & Crisis Lifeline (988). Continue?')) {
        window.location.href = 'tel:988';
    }
}

/**
 * DASHBOARD FUNCTIONS
 */

/**
 * Update dashboard with current user data
 */
function updateDashboard() {
    if (!currentUser) return;
    
    updateDaysJoined();
    updateConnectionsCount();
    updateCheckinsCount();
    updateResourcesUsed();
}

/**
 * Update days since joining counter
 */
function updateDaysJoined() {
    const element = document.getElementById('daysJoined');
    if (element && currentUser) {
        const registrationDate = new Date(currentUser.registrationDate);
        const today = new Date();
        const daysDiff = Math.floor((today - registrationDate) / (1000 * 60 * 60 * 24));
        element.textContent = daysDiff;
    }
}

/**
 * Update connections count
 */
function updateConnectionsCount() {
    const element = document.getElementById('connections');
    if (element && currentUser) {
        const connectionsCount = currentUser.supportTypes ? currentUser.supportTypes.length : 0;
        element.textContent = connectionsCount + supportConnections.length;
    }
}

/**
 * Update check-ins count
 */
function updateCheckinsCount() {
    const element = document.getElementById('checkins');
    if (element) {
        element.textContent = checkins.length;
    }
}

/**
 * Update resources used count
 */
function updateResourcesUsed() {
    const element = document.getElementById('resourcesUsed');
    if (element) {
        // Simulate resources accessed based on user activity
        element.textContent = Math.floor(Math.random() * 15) + 5;
    }
}

/**
 * RESOURCE INTERACTION FUNCTIONS
 */

/**
 * Join peer support group
 */
function joinPeerGroup() {
    supportConnections.push({ type: 'peer', date: new Date().toISOString() });
    showAlert('success', 'Great! We\'ll connect you with a peer support group coordinator within 24 hours.');
    updateDashboard();
}

/**
 * Find healthcare providers
 */
function findHealthcare() {
    supportConnections.push({ type: 'healthcare', date: new Date().toISOString() });
    showAlert('success', 'Searching for healthcare providers in your area. You\'ll receive a list of available options shortly.');
    updateDashboard();
}

/**
 * Find counselors
 */
function findCounselors() {
    supportConnections.push({ type: 'counseling', date: new Date().toISOString() });
    showAlert('success', 'Finding licensed counselors near you. We\'ll send you contact information and availability.');
    updateDashboard();
}

/**
 * Find faith-based support
 */
function findFaithSupport() {
    supportConnections.push({ type: 'faith', date: new Date().toISOString() });
    showAlert('success', 'Connecting you with faith-based mental health support in your community.');
    updateDashboard();
}

/**
 * Explore NGO resources
 */
function exploreNGOs() {
    supportConnections.push({ type: 'ngo', date: new Date().toISOString() });
    showAlert('success', 'Exploring NGO mental health programs. You\'ll receive information about available services.');
    updateDashboard();
}

/**
 * SUPPORT GROUP INTERACTION FUNCTIONS
 */

/**
 * Join a specific support group
 * @param {string} groupId - The ID of the group to join
 */
function joinGroup(groupId) {
    supportConnections.push({ type: 'group', groupId, date: new Date().toISOString() });
    showAlert('success', 'Request sent! The group facilitator will contact you within 48 hours with joining information.');
    updateDashboard();
}

/**
 * Contact a specific group for information
 * @param {string} groupId - The ID of the group to contact
 */
function contactGroup(groupId) {
    showAlert('success', 'Contact information sent to your email. You can reach out directly to learn more.');
}

/**
 * Book an appointment with a provider
 * @param {string} providerId - The ID of the provider
 */
function bookAppointment(providerId) {
    supportConnections.push({ type: 'appointment', providerId, date: new Date().toISOString() });
    showAlert('success', 'Appointment request submitted. The provider will contact you within 1-2 business days.');
    updateDashboard();
}

/**
 * Learn more about a provider
 * @param {string} providerId - The ID of the provider
 */
function learnMore(providerId) {
    showAlert('success', 'More information about this provider has been sent to your email.');
}

/**
 * Contact a hospital mental health unit
 * @param {string} hospitalId - The ID of the hospital
 */
function contactHospital(hospitalId) {
    showAlert('success', 'Contact information provided. You can call directly or request a callback.');
}

/**
 * Get directions to a location
 * @param {string} locationId - The ID of the location
 */
function getDirections(locationId) {
    showAlert('success', 'Directions sent to your phone. You can also access them anytime from your dashboard.');
}

/**
 * Join a ministry program
 * @param {string} ministryId - The ID of the ministry
 */
function joinMinistry(ministryId) {
    supportConnections.push({ type: 'ministry', ministryId, date: new Date().toISOString() });
    showAlert('success', 'Ministry coordinator will reach out to welcome you and provide meeting details.');
    updateDashboard();
}

/**
 * Contact a ministry
 * @param {string} ministryId - The ID of the ministry
 */
function contactMinistry(ministryId) {
    showAlert('success', 'Contact information provided. Feel free to reach out with any questions.');
}

/**
 * Explore NGO programs
 * @param {string} ngoId - The ID of the NGO
 */
function explorePrograms(ngoId) {
    showAlert('success', 'Program information sent to your email. Explore various mental health initiatives.');
}

/**
 * Volunteer with an NGO
 * @param {string} ngoId - The ID of the NGO
 */
function volunteer(ngoId) {
    showAlert('success', 'Thank you for your interest! Volunteer coordinator will contact you about opportunities.');
}

/**
 * DASHBOARD ACTION FUNCTIONS
 */

/**
 * View user schedule
 */
function viewSchedule() {
    showAlert('success', 'Your upcoming appointments and sessions are displayed in your personal calendar.');
}

/**
 * View mood trends
 */
function viewMoodTrends() {
    showAlert('success', 'Mood tracking chart updated. Review your progress patterns over time.');
}

/**
 * Manage user goals
 */
function manageGoals() {
    showAlert('success', 'Goal management tools opened. Set new goals and track your achievements.');
}

/**
 * UTILITY FUNCTIONS
 */

/**
 * Show alert message to user
 * @param {string} type - Alert type (success, warning, danger)
 * @param {string} message - Alert message
 */
function showAlert(type, message) {
    // Remove any existing alerts
    const existingAlerts = document.querySelectorAll('.alert');
    existingAlerts.forEach(alert => alert.remove());
    
    // Create new alert
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    // Insert alert at top of current page
    const currentPage = document.querySelector('.page.active');
    if (currentPage) {
        const container = currentPage.querySelector('.container');
        if (container) {
            container.insertBefore(alert, container.firstChild);
        }
    }
    
    // Auto-remove alert after 5 seconds
    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove();
        }
    }, 5000);
    
    // Scroll to top to show alert
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Handle urgent support requests
 */
function handleUrgentRequest() {
    const urgencySelect = document.getElementById('urgencyLevel');
    if (urgencySelect && urgencySelect.value === 'urgent') {
        if (confirm('You indicated you need immediate help. Would you like to connect with crisis support resources right now?')) {
            showCrisisModal();
        }
    }
}

/**
 * Initialize urgency level change handler
 */
function initializeUrgencyHandler() {
    const urgencySelect = document.getElementById('urgencyLevel');
    if (urgencySelect) {
        urgencySelect.addEventListener('change', handleUrgentRequest);
    }
}

/**
 * Handle modal clicks outside content area
 * @param {Event} event - Click event
 */
function handleModalClick(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

/**
 * INITIALIZATION FUNCTIONS
 */

/**
 * Initialize demo data for demonstration purposes
 */
function initializeDemoData() {
    // Create demo user
    currentUser = {
        id: 1,
        fullName: 'Demo User',
        email: 'demo@mindconnect.org',
        registrationDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
        supportTypes: ['peer', 'counseling', 'healthcare'],
        location: 'Lusaka, Zambia'
    };
    
    // Add sample check-ins
    for (let i = 0; i < 12; i++) {
        checkins.push({
            id: Date.now() + i,
            date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
            mood: Math.floor(Math.random() * 10) + 1,
            activities: ['exercise', 'selfcare'],
            notes: 'Sample check-in note'
        });
    }
    
    // Add sample support connections
    supportConnections.push(
        { type: 'peer', date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
        { type: 'counseling', date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() }
    );
}

/**
 * Initialize all event listeners
 */
function initializeEventListeners() {
    // Form event listeners
    initializeRegistrationForm();
    initializeSupportSearchForm();
    initializeCheckinForm();
    initializeUrgencyHandler();
    
    // Modal click outside handler
    window.addEventListener('click', handleModalClick);
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
}

/**
 * Handle keyboard navigation
 * @param {KeyboardEvent} event - Keyboard event
 */
function handleKeyboardNavigation(event) {
    // Close modals with Escape key
    if (event.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal[style*="block"]');
        openModals.forEach(modal => {
            modal.style.display = 'none';
        });
    }
}

/**
 * APPLICATION STARTUP
 */

/**
 * Initialize the application when DOM is loaded
 */
function initializeApp() {
    // Initialize demo data
    initializeDemoData();
    
    // Initialize event listeners
    initializeEventListeners();
    
    // Update dashboard
    updateDashboard();
    
    // Log successful initialization
    console.log('MindConnect application initialized successfully');
    console.log('Supporting SDG 3: Good Health and Well-being');
}

// Initialize app when DOM content is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

/**
 * SERVICE WORKER REGISTRATION (for PWA capabilities)
 */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('ServiceWorker registration successful:', registration.scope);
            })
            .catch((error) => {
                console.log('ServiceWorker registration failed:', error);
            });
    });
}

/**
 * EXPORT FOR TESTING (if in Node.js environment)
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showPage,
        handleRegistration,
        updateDashboard,
        showAlert,
        joinPeerGroup,
        findHealthcare,
        findCounselors
    };
}
