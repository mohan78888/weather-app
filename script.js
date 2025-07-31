// Weather App JavaScript
class WeatherApp {
    constructor() {
        this.apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
        this.baseUrl = 'https://api.openweathermap.org/data/2.5';
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadDefaultWeather();
        this.initTabs();
        this.initNavigation();
        this.initAuth();
    }

    bindEvents() {
        const searchBtn = document.getElementById('searchBtn');
        const cityInput = document.getElementById('cityInput');

        searchBtn.addEventListener('click', () => this.searchWeather());
        cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.searchWeather();
            }
        });
    }

    initTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all tabs
                tabButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.classList.remove('text-white');
                    btn.classList.add('text-gray-400');
                    btn.classList.remove('border-accent');
                    btn.classList.add('border-transparent');
                });
                
                // Add active class to clicked tab
                button.classList.add('active');
                button.classList.add('text-white');
                button.classList.remove('text-gray-400');
                button.classList.add('border-accent');
                button.classList.remove('border-transparent');
                
                // Handle tab content (you can add more functionality here)
                const tabName = button.getAttribute('data-tab');
                console.log('Switched to tab:', tabName);
            });
        });
    }

    initNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn');
        const sections = {
            home: document.getElementById('currentWeather'),
            search: document.querySelector('.max-w-md'), // Search section
            notifications: document.getElementById('alertBanner'),
            activity: document.getElementById('forecastSection')
        };

        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                const section = button.getAttribute('data-section');
                
                // Remove active class from all nav buttons
                navButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.querySelector('i').classList.remove('text-accent');
                    btn.querySelector('i').classList.add('text-gray-400');
                    btn.querySelector('span').classList.remove('text-accent', 'font-medium');
                    btn.querySelector('span').classList.add('text-gray-400');
                });
                
                // Add active class to clicked button
                button.classList.add('active');
                button.querySelector('i').classList.add('text-accent');
                button.querySelector('i').classList.remove('text-gray-400');
                button.querySelector('span').classList.add('text-accent', 'font-medium');
                button.querySelector('span').classList.remove('text-gray-400');
                
                // Show/hide sections based on navigation
                this.showSection(section);
            });
        });

        // Settings button functionality
        const settingsBtn = document.querySelector('.settings-btn');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => {
                this.showSettings();
            });
        }

        // User profile button functionality
        const userProfileBtn = document.querySelector('.user-profile-btn');
        if (userProfileBtn) {
            userProfileBtn.addEventListener('click', () => {
                this.showUserProfile();
            });
        }
    }

    initAuth() {
        // Login button functionality
        const loginBtn = document.querySelector('.login-btn');
        if (loginBtn) {
            loginBtn.addEventListener('click', () => {
                this.showAuthModal();
            });
        }

        // Check if user is logged in
        this.checkAuthStatus();
    }

    checkAuthStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const userProfileBtn = document.querySelector('.user-profile-btn');
        const loginBtn = document.querySelector('.login-btn');

        if (isLoggedIn) {
            // User is logged in
            if (userProfileBtn) userProfileBtn.style.display = 'block';
            if (loginBtn) loginBtn.style.display = 'none';
        } else {
            // User is not logged in
            if (userProfileBtn) userProfileBtn.style.display = 'none';
            if (loginBtn) loginBtn.style.display = 'block';
        }
    }

    showAuthModal() {
        // Create auth modal if it doesn't exist
        let authModal = document.getElementById('authModal');
        if (!authModal) {
            authModal = document.createElement('div');
            authModal.id = 'authModal';
            authModal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center';
            authModal.innerHTML = `
                <div class="bg-gradient-to-br from-card-bg to-gray-800 rounded-2xl shadow-2xl border border-indigo-600/50 p-6 max-w-md w-full mx-4">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-2xl font-bold text-white">Welcome</h3>
                        <button class="close-auth text-gray-400 hover:text-white text-2xl cursor-pointer">×</button>
                    </div>
                    
                    <!-- Auth Tabs -->
                    <div class="flex space-x-4 mb-6 border-b border-indigo-600/30">
                        <button class="auth-tab active px-4 py-2 text-white font-medium border-b-2 border-accent transition-all duration-300 cursor-pointer" data-tab="login">
                            Login
                        </button>
                        <button class="auth-tab px-4 py-2 text-gray-400 font-medium border-b-2 border-transparent transition-all duration-300 cursor-pointer" data-tab="signup">
                            Sign Up
                        </button>
                    </div>
                    
                    <!-- Login Form -->
                    <div id="loginForm" class="auth-form">
                        <div class="space-y-4">
                            <div>
                                <label class="block text-white text-sm font-medium mb-2">Email</label>
                                <input type="email" id="loginEmail" class="w-full bg-card-bg border border-indigo-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400/50" placeholder="Enter your email">
                            </div>
                            <div>
                                <label class="block text-white text-sm font-medium mb-2">Password</label>
                                <input type="password" id="loginPassword" class="w-full bg-card-bg border border-indigo-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400/50" placeholder="Enter your password">
                            </div>
                            <button class="w-full bg-gradient-to-r from-accent to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-medium py-3 rounded-lg transition-all duration-300 hover:scale-105" onclick="weatherApp.login()">
                                Login
                            </button>
                        </div>
                    </div>
                    
                    <!-- Sign Up Form -->
                    <div id="signupForm" class="auth-form hidden">
                        <div class="space-y-4">
                            <div>
                                <label class="block text-white text-sm font-medium mb-2">Full Name</label>
                                <input type="text" id="signupName" class="w-full bg-card-bg border border-indigo-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400/50" placeholder="Enter your full name">
                            </div>
                            <div>
                                <label class="block text-white text-sm font-medium mb-2">Email</label>
                                <input type="email" id="signupEmail" class="w-full bg-card-bg border border-indigo-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400/50" placeholder="Enter your email">
                            </div>
                            <div>
                                <label class="block text-white text-sm font-medium mb-2">Password</label>
                                <input type="password" id="signupPassword" class="w-full bg-card-bg border border-indigo-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400/50" placeholder="Create a password">
                            </div>
                            <div>
                                <label class="block text-white text-sm font-medium mb-2">Confirm Password</label>
                                <input type="password" id="signupConfirmPassword" class="w-full bg-card-bg border border-indigo-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400/50" placeholder="Confirm your password">
                            </div>
                            <button class="w-full bg-gradient-to-r from-accent to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-medium py-3 rounded-lg transition-all duration-300 hover:scale-105" onclick="weatherApp.signup()">
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(authModal);
            
            // Add auth tab functionality
            const authTabs = authModal.querySelectorAll('.auth-tab');
            authTabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    const tabName = tab.getAttribute('data-tab');
                    
                    // Update tab styles
                    authTabs.forEach(t => {
                        t.classList.remove('active', 'text-white', 'border-accent');
                        t.classList.add('text-gray-400', 'border-transparent');
                    });
                    tab.classList.add('active', 'text-white', 'border-accent');
                    tab.classList.remove('text-gray-400', 'border-transparent');
                    
                    // Show/hide forms
                    const loginForm = document.getElementById('loginForm');
                    const signupForm = document.getElementById('signupForm');
                    
                    if (tabName === 'login') {
                        loginForm.classList.remove('hidden');
                        signupForm.classList.add('hidden');
                    } else {
                        loginForm.classList.add('hidden');
                        signupForm.classList.remove('hidden');
                    }
                });
            });
            
            // Add close functionality
            const closeBtn = authModal.querySelector('.close-auth');
            closeBtn.addEventListener('click', () => {
                authModal.remove();
            });
            
            // Close on outside click
            authModal.addEventListener('click', (e) => {
                if (e.target === authModal) {
                    authModal.remove();
                }
            });
        } else {
            authModal.classList.remove('hidden');
        }
    }

    login() {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        if (!email || !password) {
            this.showToast('Please fill in all fields', 'error');
            return;
        }
        
        // Simulate login (replace with real authentication)
        if (email === 'demo@example.com' && password === 'password') {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            this.showToast('Login successful!', 'success');
            this.checkAuthStatus();
            document.getElementById('authModal').remove();
        } else {
            this.showToast('Invalid credentials. Try: demo@example.com / password', 'error');
        }
    }

    signup() {
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('signupConfirmPassword').value;
        
        if (!name || !email || !password || !confirmPassword) {
            this.showToast('Please fill in all fields', 'error');
            return;
        }
        
        if (password !== confirmPassword) {
            this.showToast('Passwords do not match', 'error');
            return;
        }
        
        if (password.length < 6) {
            this.showToast('Password must be at least 6 characters', 'error');
            return;
        }
        
        // Simulate signup (replace with real authentication)
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', name);
        this.showToast('Account created successfully!', 'success');
        this.checkAuthStatus();
        document.getElementById('authModal').remove();
    }

    showUserProfile() {
        const userEmail = localStorage.getItem('userEmail');
        const userName = localStorage.getItem('userName');
        
        // Create user profile modal
        let profileModal = document.getElementById('profileModal');
        if (!profileModal) {
            profileModal = document.createElement('div');
            profileModal.id = 'profileModal';
            profileModal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center';
            profileModal.innerHTML = `
                <div class="bg-gradient-to-br from-card-bg to-gray-800 rounded-2xl shadow-2xl border border-indigo-600/50 p-6 max-w-md w-full mx-4">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-2xl font-bold text-white">Profile</h3>
                        <button class="close-profile text-gray-400 hover:text-white text-2xl cursor-pointer">×</button>
                    </div>
                    
                    <div class="space-y-4">
                        <div class="text-center mb-6">
                            <div class="w-20 h-20 bg-gradient-to-r from-accent to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i class="fas fa-user text-white text-2xl"></i>
                            </div>
                            <h4 class="text-xl font-bold text-white">${userName || 'User'}</h4>
                            <p class="text-gray-400">${userEmail || 'user@example.com'}</p>
                        </div>
                        
                        <div class="space-y-3">
                            <button class="w-full bg-gradient-to-r from-accent to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-medium py-3 rounded-lg transition-all duration-300 hover:scale-105">
                                <i class="fas fa-cog mr-2"></i>Settings
                            </button>
                            <button class="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-medium py-3 rounded-lg transition-all duration-300 hover:scale-105" onclick="weatherApp.logout()">
                                <i class="fas fa-sign-out-alt mr-2"></i>Logout
                            </button>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(profileModal);
            
            // Add close functionality
            const closeBtn = profileModal.querySelector('.close-profile');
            closeBtn.addEventListener('click', () => {
                profileModal.remove();
            });
            
            // Close on outside click
            profileModal.addEventListener('click', (e) => {
                if (e.target === profileModal) {
                    profileModal.remove();
                }
            });
        } else {
            profileModal.classList.remove('hidden');
        }
    }

    logout() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        this.showToast('Logged out successfully', 'success');
        this.checkAuthStatus();
        document.getElementById('profileModal').remove();
    }

    showSection(sectionName) {
        // Hide all sections first
        const allSections = [
            document.getElementById('currentWeather'),
            document.getElementById('hourlyForecast'),
            document.getElementById('forecastSection'),
            document.getElementById('alertBanner'),
            document.getElementById('searchSection') // Search section
        ];

        allSections.forEach(section => {
            if (section) section.classList.add('hidden');
        });

        // Show selected section
        switch(sectionName) {
            case 'home':
                document.getElementById('currentWeather')?.classList.remove('hidden');
                document.getElementById('hourlyForecast')?.classList.remove('hidden');
                document.getElementById('forecastSection')?.classList.remove('hidden');
                break;
            case 'search':
                document.getElementById('searchSection')?.classList.remove('hidden');
                break;
            case 'notifications':
                document.getElementById('alertBanner')?.classList.remove('hidden');
                // Show a notification panel
                this.showNotificationPanel();
                break;
            case 'activity':
                document.getElementById('forecastSection')?.classList.remove('hidden');
                // Show activity/analytics
                this.showActivityPanel();
                break;
        }
    }

    showNotificationPanel() {
        // Create notification panel if it doesn't exist
        let notificationPanel = document.getElementById('notificationPanel');
        if (!notificationPanel) {
            notificationPanel = document.createElement('div');
            notificationPanel.id = 'notificationPanel';
            notificationPanel.className = 'max-w-4xl mx-auto mt-8 p-6 bg-gradient-to-br from-card-bg to-cyan-900 rounded-2xl shadow-2xl border border-cyan-600/50 backdrop-blur-sm';
            notificationPanel.innerHTML = `
                <h3 class="text-2xl font-bold text-white mb-4">Weather Alerts</h3>
                <div class="space-y-4">
                    <div class="bg-gradient-to-r from-warning to-yellow-500 text-black p-4 rounded-xl">
                        <div class="flex items-center space-x-3">
                            <i class="fas fa-exclamation-triangle text-xl"></i>
                            <div>
                                <h4 class="font-bold">Rain Alert</h4>
                                <p>Heavy rain expected in the next 2 hours</p>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 rounded-xl">
                        <div class="flex items-center space-x-3">
                            <i class="fas fa-info-circle text-xl"></i>
                            <div>
                                <h4 class="font-bold">Weather Update</h4>
                                <p>Temperature will drop by 5°C tonight</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            document.querySelector('main').appendChild(notificationPanel);
        } else {
            notificationPanel.classList.remove('hidden');
        }
    }

    showActivityPanel() {
        // Create activity panel if it doesn't exist
        let activityPanel = document.getElementById('activityPanel');
        if (!activityPanel) {
            activityPanel = document.createElement('div');
            activityPanel.id = 'activityPanel';
            activityPanel.className = 'max-w-4xl mx-auto mt-8 p-6 bg-gradient-to-br from-card-bg to-cyan-900 rounded-2xl shadow-2xl border border-cyan-600/50 backdrop-blur-sm';
            activityPanel.innerHTML = `
                <h3 class="text-2xl font-bold text-white mb-4">Weather Activity</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-gradient-to-br from-cyan-800 to-cyan-900 p-4 rounded-xl">
                        <h4 class="text-lg font-bold text-white mb-2">Temperature Trend</h4>
                        <div class="text-3xl font-bold text-accent">↗️ +2°C</div>
                        <p class="text-gray-300 text-sm">Rising over the last 24 hours</p>
                    </div>
                    <div class="bg-gradient-to-br from-blue-800 to-blue-900 p-4 rounded-xl">
                        <h4 class="text-lg font-bold text-white mb-2">Humidity Level</h4>
                        <div class="text-3xl font-bold text-accent">85%</div>
                        <p class="text-gray-300 text-sm">High humidity detected</p>
                    </div>
                </div>
            `;
            document.querySelector('main').appendChild(activityPanel);
        } else {
            activityPanel.classList.remove('hidden');
        }
    }

    showSettings() {
        // Create settings panel if it doesn't exist
        let settingsPanel = document.getElementById('settingsPanel');
        if (!settingsPanel) {
            settingsPanel = document.createElement('div');
            settingsPanel.id = 'settingsPanel';
            settingsPanel.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center';
            settingsPanel.innerHTML = `
                <div class="bg-gradient-to-br from-card-bg to-gray-800 rounded-2xl shadow-2xl border border-indigo-600/50 p-6 max-w-md w-full mx-4">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-2xl font-bold text-white">Settings</h3>
                        <button class="close-settings text-gray-400 hover:text-white text-2xl cursor-pointer">×</button>
                    </div>
                    <div class="space-y-6">
                        <!-- Dark Mode Toggle -->
                        <div class="flex items-center justify-between p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl border border-gray-600/30">
                            <div class="flex items-center space-x-3">
                                <div class="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                                    <i class="fas fa-moon text-white text-lg"></i>
                                </div>
                                <div>
                                    <span class="text-white font-medium">Dark Mode</span>
                                    <p class="text-gray-400 text-sm">Switch theme</p>
                                </div>
                            </div>
                            <div class="toggle-switch w-14 h-7 bg-indigo-600 rounded-full relative cursor-pointer transition-all duration-500 shadow-lg" data-setting="darkMode">
                                <div class="toggle-knob w-6 h-6 bg-white rounded-full absolute top-0.5 left-0.5 transition-all duration-500 shadow-md"></div>
                                <div class="absolute inset-0 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full opacity-0 transition-opacity duration-300"></div>
                            </div>
                        </div>
                        
                        <!-- Notifications Toggle -->
                        <div class="flex items-center justify-between p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl border border-gray-600/30">
                            <div class="flex items-center space-x-3">
                                <div class="w-10 h-10 bg-gradient-to-r from-green-400 to-green-500 rounded-lg flex items-center justify-center">
                                    <i class="fas fa-bell text-white text-lg"></i>
                                </div>
                                <div>
                                    <span class="text-white font-medium">Notifications</span>
                                    <p class="text-gray-400 text-sm">Weather alerts</p>
                                </div>
                            </div>
                            <div class="toggle-switch w-14 h-7 bg-indigo-600 rounded-full relative cursor-pointer transition-all duration-500 shadow-lg" data-setting="notifications">
                                <div class="toggle-knob w-6 h-6 bg-white rounded-full absolute top-0.5 left-0.5 transition-all duration-500 shadow-md"></div>
                                <div class="absolute inset-0 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full opacity-0 transition-opacity duration-300"></div>
                            </div>
                        </div>
                        
                        <!-- Location Access Toggle -->
                        <div class="flex items-center justify-between p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl border border-gray-600/30">
                            <div class="flex items-center space-x-3">
                                <div class="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg flex items-center justify-center">
                                    <i class="fas fa-map-marker-alt text-white text-lg"></i>
                                </div>
                                <div>
                                    <span class="text-white font-medium">Location Access</span>
                                    <p class="text-gray-400 text-sm">Auto-detect location</p>
                                </div>
                            </div>
                            <div class="toggle-switch w-14 h-7 bg-gray-600 rounded-full relative cursor-pointer transition-all duration-500 shadow-lg" data-setting="location">
                                <div class="toggle-knob w-6 h-6 bg-white rounded-full absolute top-0.5 right-0.5 transition-all duration-500 shadow-md"></div>
                                <div class="absolute inset-0 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full opacity-0 transition-opacity duration-300"></div>
                            </div>
                        </div>
                        
                        <!-- Temperature Unit -->
                        <div class="flex items-center justify-between p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl border border-gray-600/30">
                            <div class="flex items-center space-x-3">
                                <div class="w-10 h-10 bg-gradient-to-r from-red-400 to-red-500 rounded-lg flex items-center justify-center">
                                    <i class="fas fa-thermometer-half text-white text-lg"></i>
                                </div>
                                <div>
                                    <span class="text-white font-medium">Temperature Unit</span>
                                    <p class="text-gray-400 text-sm">Celsius or Fahrenheit</p>
                                </div>
                            </div>
                            <select class="bg-card-bg border border-indigo-600/50 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400/50 transition-all duration-300 hover:border-indigo-400">
                                <option value="celsius">°C (Celsius)</option>
                                <option value="fahrenheit">°F (Fahrenheit)</option>
                            </select>
                        </div>
                        
                        <!-- Language -->
                        <div class="flex items-center justify-between p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl border border-gray-600/30">
                            <div class="flex items-center space-x-3">
                                <div class="w-10 h-10 bg-gradient-to-r from-purple-400 to-purple-500 rounded-lg flex items-center justify-center">
                                    <i class="fas fa-globe text-white text-lg"></i>
                                </div>
                                <div>
                                    <span class="text-white font-medium">Language</span>
                                    <p class="text-gray-400 text-sm">App language</p>
                                </div>
                            </div>
                            <select class="bg-card-bg border border-indigo-600/50 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400/50 transition-all duration-300 hover:border-indigo-400">
                                <option value="english">English</option>
                                <option value="hindi">हिंदी</option>
                                <option value="spanish">Español</option>
                            </select>
                        </div>
                        
                        <!-- Save Button -->
                        <button class="w-full bg-gradient-to-r from-accent to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-medium py-4 rounded-xl transition-all duration-300 hover:scale-105 mt-6 shadow-lg hover:shadow-xl">
                            <i class="fas fa-save mr-2"></i>Save Settings
                        </button>
                    </div>
                </div>
            `;
            document.body.appendChild(settingsPanel);
            
            // Add toggle functionality with enhanced animations
            const toggleSwitches = settingsPanel.querySelectorAll('.toggle-switch');
            toggleSwitches.forEach(toggle => {
                toggle.addEventListener('click', () => {
                    const knob = toggle.querySelector('.toggle-knob');
                    const gradientBg = toggle.querySelector('.absolute');
                    const isActive = toggle.classList.contains('bg-indigo-600');
                    
                    // Add click animation
                    toggle.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        toggle.style.transform = 'scale(1)';
                    }, 150);
                    
                    if (isActive) {
                        // Turn off
                        toggle.classList.remove('bg-indigo-600');
                        toggle.classList.add('bg-gray-600');
                        knob.style.transform = 'translateX(28px)';
                        gradientBg.style.opacity = '0';
                        
                        // Add glow effect
                        toggle.style.boxShadow = '0 0 0 0 rgba(99, 102, 241, 0.7)';
                        setTimeout(() => {
                            toggle.style.boxShadow = '';
                        }, 300);
                    } else {
                        // Turn on
                        toggle.classList.remove('bg-gray-600');
                        toggle.classList.add('bg-indigo-600');
                        knob.style.transform = 'translateX(0)';
                        gradientBg.style.opacity = '1';
                        
                        // Add glow effect
                        toggle.style.boxShadow = '0 0 20px rgba(99, 102, 241, 0.5)';
                        setTimeout(() => {
                            toggle.style.boxShadow = '';
                        }, 300);
                    }
                    
                    // Handle specific settings
                    const setting = toggle.getAttribute('data-setting');
                    this.handleSettingChange(setting, !isActive);
                });
            });
            
            // Add close functionality
            const closeBtn = settingsPanel.querySelector('.close-settings');
            closeBtn.addEventListener('click', () => {
                settingsPanel.remove();
            });
            
            // Close on outside click
            settingsPanel.addEventListener('click', (e) => {
                if (e.target === settingsPanel) {
                    settingsPanel.remove();
                }
            });
            
            // Save button functionality
            const saveBtn = settingsPanel.querySelector('button');
            saveBtn.addEventListener('click', () => {
                this.saveSettings();
                settingsPanel.remove();
            });
        } else {
            settingsPanel.classList.remove('hidden');
        }
    }

    handleSettingChange(setting, value) {
        switch(setting) {
            case 'darkMode':
                console.log('Dark mode:', value ? 'enabled' : 'disabled');
                // You can implement dark mode toggle here
                break;
            case 'notifications':
                console.log('Notifications:', value ? 'enabled' : 'disabled');
                if (value) {
                    this.requestNotificationPermission();
                }
                break;
            case 'location':
                console.log('Location access:', value ? 'enabled' : 'disabled');
                if (value) {
                    this.requestLocationPermission();
                }
                break;
        }
    }

    async requestNotificationPermission() {
        if ('Notification' in window) {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                this.showToast('Notifications enabled!', 'success');
            } else {
                this.showToast('Notification permission denied', 'error');
            }
        }
    }

    async requestLocationPermission() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.showToast('Location access granted!', 'success');
                    // You can use position.coords.latitude and position.coords.longitude
                },
                (error) => {
                    this.showToast('Location access denied', 'error');
                }
            );
        }
    }

    saveSettings() {
        this.showToast('Settings saved successfully!', 'success');
        // You can save settings to localStorage here
        localStorage.setItem('weatherAppSettings', JSON.stringify({
            darkMode: true,
            notifications: true,
            location: false,
            temperatureUnit: 'celsius',
            language: 'english'
        }));
    }

    showToast(message, type = 'info') {
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = `fixed top-20 right-4 z-50 px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 transform translate-x-full`;
        
        if (type === 'success') {
            toast.classList.add('bg-green-500');
        } else if (type === 'error') {
            toast.classList.add('bg-red-500');
        } else {
            toast.classList.add('bg-cyan-500');
        }
        
        toast.textContent = message;
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.transform = 'translateX(full)';
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }

    async searchWeather() {
        const cityInput = document.getElementById('cityInput');
        const city = cityInput.value.trim();

        if (!city) {
            this.showError('Please enter a city name');
            return;
        }

        this.showLoading();
        try {
            const weatherData = await this.getWeatherData(city);
            this.displayWeather(weatherData);
        } catch (error) {
            this.showError('City not found. Please try again.');
        }
    }

    async getWeatherData(city) {
        // For demo purposes, using mock data if no API key
        if (this.apiKey === 'YOUR_API_KEY') {
            return this.getMockWeatherData(city);
        }

        try {
            const response = await fetch(
                `${this.baseUrl}/forecast?q=${city}&appid=${this.apiKey}&units=metric`
            );
            
            if (!response.ok) {
                throw new Error('City not found');
            }

            return await response.json();
        } catch (error) {
            // Fallback to mock data
            return this.getMockWeatherData(city);
        }
    }

    getMockWeatherData(city) {
        const weatherConditions = [
            { main: 'Clear', description: 'clear sky', icon: 'fa-sun' },
            { main: 'Clouds', description: 'scattered clouds', icon: 'fa-cloud' },
            { main: 'Rain', description: 'light rain', icon: 'fa-cloud-rain' },
            { main: 'Snow', description: 'light snow', icon: 'fa-snowflake' },
            { main: 'Thunderstorm', description: 'thunderstorm', icon: 'fa-bolt' }
        ];

        const currentWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
        const currentTemp = Math.floor(Math.random() * 30) + 5; // 5-35°C

        return {
            city: {
                name: city
            },
            list: [
                {
                    dt: Date.now() / 1000,
                    main: {
                        temp: currentTemp,
                        feels_like: currentTemp - 2
                    },
                    weather: [currentWeather]
                },
                // Generate 3 days of forecast
                ...Array.from({ length: 3 }, (_, i) => {
                    const forecastWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
                    const forecastTemp = Math.floor(Math.random() * 25) + 8;
                    return {
                        dt: (Date.now() / 1000) + (i + 1) * 86400,
                        main: {
                            temp: forecastTemp,
                            feels_like: forecastTemp - 1
                        },
                        weather: [forecastWeather]
                    };
                })
            ]
        };
    }

    displayWeather(data) {
        this.hideAllStates();
        
        const current = data.list[0];
        const forecast = data.list.slice(1, 4);

        // Update current weather
        this.updateCurrentWeather(data.city.name, current);
        
        // Update hourly forecast
        this.updateHourlyForecast(data.list.slice(0, 8));
        
        // Update forecast
        this.updateForecast(forecast);
        
        // Check for alerts
        this.checkAlerts(forecast);
        
        // Show weather sections
        document.getElementById('currentWeather').classList.remove('hidden');
        document.getElementById('hourlyForecast').classList.remove('hidden');
        document.getElementById('forecastSection').classList.remove('hidden');
    }

    updateCurrentWeather(cityName, current) {
        const cityNameEl = document.getElementById('cityName');
        const currentTempEl = document.getElementById('currentTemp');
        const weatherIconEl = document.getElementById('weatherIcon');
        const weatherDescEl = document.getElementById('weatherDesc');
        const currentDateEl = document.getElementById('currentDate');
        const feelsLikeEl = document.getElementById('feelsLike');
        const precipChanceEl = document.getElementById('precipChance');
        const humidityEl = document.getElementById('humidity');
        const windSpeedEl = document.getElementById('windSpeed');

        cityNameEl.textContent = cityName;
        currentTempEl.textContent = `${Math.round(current.main.temp)}°`;
        weatherDescEl.textContent = current.weather[0].description;
        feelsLikeEl.textContent = `Feels like ${Math.round(current.main.feels_like)}°`;
        
        // Mock data for additional details
        precipChanceEl.textContent = '50%';
        humidityEl.textContent = '95%';
        windSpeedEl.textContent = '8 kph';
        
        // Set weather icon with dynamic color
        weatherIconEl.className = `fas ${this.getWeatherIcon(current.weather[0].main)} text-4xl ${this.getWeatherIconColor(current.weather[0].main)}`;
        
        // Update date
        const date = new Date();
        currentDateEl.textContent = date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
        });
    }

    updateForecast(forecast) {
        const forecastGrid = document.getElementById('forecastGrid');
        forecastGrid.innerHTML = '';

        forecast.forEach((day, index) => {
            const date = new Date(day.dt * 1000);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            const temp = Math.round(day.main.temp);
            const weather = day.weather[0];

            const card = document.createElement('div');
            card.className = 'bg-gradient-to-br from-card-bg to-gray-800 rounded-2xl shadow-xl border border-indigo-600/50 p-6 text-center hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500 hover:scale-105 hover:-translate-y-2 group backdrop-blur-sm cursor-pointer';
            card.style.animationDelay = `${index * 0.1}s`;
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            card.innerHTML = `
                <div class="relative">
                    <!-- Background glow effect -->
                    <div class="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                    
                    <div class="relative z-10">
                        <div class="text-2xl font-bold bg-gradient-to-r from-accent to-cyan-400 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">${dayName}</div>
                        <div class="text-4xl font-bold text-white mb-3 group-hover:scale-110 transition-transform duration-300">${temp}°</div>
                        <div class="flex items-center justify-center space-x-3 mb-3">
                            <i class="fas ${this.getWeatherIcon(weather.main)} text-2xl ${this.getWeatherIconColor(weather.main)} group-hover:scale-125 group-hover:rotate-12 transition-all duration-300"></i>
                        </div>
                        <div class="text-gray-200 font-medium text-sm group-hover:text-white transition-colors duration-300">${weather.description}</div>
                    </div>
                </div>
            `;

            forecastGrid.appendChild(card);
            
            // Animate card entrance
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            }, index * 100);
        });
    }

    updateHourlyForecast(hourlyData) {
        const hourlyContainer = document.querySelector('#hourlyForecast .flex');
        hourlyContainer.innerHTML = '';

        hourlyData.forEach((hour, index) => {
            const date = new Date(hour.dt * 1000);
            const time = index === 0 ? 'NOW' : date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }).toLowerCase();
            const temp = Math.round(hour.main.temp);
            const weather = hour.weather[0];
            const precipChance = Math.floor(Math.random() * 80) + 20; // Mock precipitation chance

            const card = document.createElement('div');
            card.className = 'bg-gradient-to-br from-card-bg to-gray-800 rounded-xl shadow-lg border border-indigo-600/50 p-4 text-center min-w-[80px] hover:shadow-indigo-500/20 transition-all duration-300 hover:scale-105 cursor-pointer';
            
            card.innerHTML = `
                <div class="text-sm font-medium text-gray-300 mb-1">${time}</div>
                <div class="text-xs text-indigo-300 mb-2">${precipChance}%</div>
                <div class="flex justify-center mb-2">
                    <i class="fas ${this.getWeatherIcon(weather.main)} text-lg ${this.getWeatherIconColor(weather.main)}"></i>
                </div>
                <div class="text-lg font-bold text-white">${temp}°</div>
            `;

            hourlyContainer.appendChild(card);
        });
    }

    getWeatherIcon(weatherMain) {
        const iconMap = {
            'Clear': 'fa-sun',
            'Clouds': 'fa-cloud',
            'Rain': 'fa-cloud-rain',
            'Snow': 'fa-snowflake',
            'Thunderstorm': 'fa-bolt',
            'Drizzle': 'fa-cloud-rain',
            'Mist': 'fa-smog',
            'Smoke': 'fa-smog',
            'Haze': 'fa-smog',
            'Dust': 'fa-smog',
            'Fog': 'fa-smog',
            'Sand': 'fa-smog',
            'Ash': 'fa-smog',
            'Squall': 'fa-wind',
            'Tornado': 'fa-wind'
        };
        
        return iconMap[weatherMain] || 'fa-cloud';
    }

    getWeatherIconColor(weatherMain) {
        const colorMap = {
            'Clear': 'text-yellow-400',
            'Clouds': 'text-gray-400',
            'Rain': 'text-blue-400',
            'Snow': 'text-blue-200',
            'Thunderstorm': 'text-purple-400',
            'Drizzle': 'text-blue-300',
            'Mist': 'text-gray-300',
            'Smoke': 'text-gray-500',
            'Haze': 'text-gray-300',
            'Dust': 'text-yellow-600',
            'Fog': 'text-gray-300',
            'Sand': 'text-yellow-600',
            'Ash': 'text-gray-500',
            'Squall': 'text-blue-300',
            'Tornado': 'text-red-400'
        };
        
        return colorMap[weatherMain] || 'text-gray-400';
    }

    checkAlerts(forecast) {
        const alertBanner = document.getElementById('alertBanner');
        const alertMessage = document.getElementById('alertMessage');
        
        // Check for rain in forecast
        const hasRain = forecast.some(day => 
            day.weather[0].main.toLowerCase().includes('rain') ||
            day.weather[0].description.toLowerCase().includes('rain')
        );

        if (hasRain) {
            alertMessage.textContent = 'Rain likely in the next few days';
            alertBanner.classList.remove('hidden');
        } else {
            alertBanner.classList.add('hidden');
        }

        // Check for extreme weather (dummy alerts)
        const hasStorm = forecast.some(day => 
            day.weather[0].main === 'Thunderstorm'
        );

        if (hasStorm) {
            alertMessage.textContent = 'Storm warning: Thunderstorms expected';
            alertBanner.classList.remove('hidden');
        }
    }

    showLoading() {
        this.hideAllStates();
        document.getElementById('loadingState').classList.remove('hidden');
    }

    showError(message) {
        this.hideAllStates();
        document.getElementById('errorState').classList.remove('hidden');
        document.getElementById('errorMessage').textContent = message;
    }

    hideAllStates() {
        document.getElementById('loadingState').classList.add('hidden');
        document.getElementById('errorState').classList.add('hidden');
        document.getElementById('currentWeather').classList.add('hidden');
        document.getElementById('hourlyForecast').classList.add('hidden');
        document.getElementById('forecastSection').classList.add('hidden');
        document.getElementById('alertBanner').classList.add('hidden');
    }

    async loadDefaultWeather() {
        // Load weather for a default city on page load
        const cityInput = document.getElementById('cityInput');
        cityInput.value = 'New York';
        
        // Make sure search section is visible
        const searchSection = document.getElementById('searchSection');
        if (searchSection) {
            searchSection.classList.remove('hidden');
        }
        
        await this.searchWeather();
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WeatherApp();
});

// Add some smooth animations
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards
    document.querySelectorAll('.bg-card-bg').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}); 