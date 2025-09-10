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
