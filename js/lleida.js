// Load header and footer
document.addEventListener('DOMContentLoaded', function() {
    // Load header from components folder
    fetch('components/header.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Header not found: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
            setActiveLink();
            // Re-initialize mobile menu after header loads
            initializeMobileMenu();
            // Load header scripts if needed
            loadHeaderScripts();
        })
        .catch(error => {
            console.error('Error loading header:', error);
            document.getElementById('header-container').innerHTML = '<p>Error loading header</p>';
        });
    
    // Load footer from components folder
    fetch('components/footer.html')
        .then(response => {
            if (!response.ok) {
                console.warn('Footer not found, skipping...');
                return null;
            }
            return response.text();
        })
        .then(data => {
            if (data) {
                document.getElementById('footer-container').innerHTML = data;
            }
        })
        .catch(error => console.warn('Footer not available:', error));
});

// Set active navigation link
function setActiveLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Initialize mobile menu if it exists
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
}

// Load header scripts
function loadHeaderScripts() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            this.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
        });
    }
}
