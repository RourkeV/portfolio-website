// Load header
fetch('components/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-container').innerHTML = data;
        // Run header scripts after header is loaded
        if (typeof initHeaderScripts === 'function') {
            initHeaderScripts();
        }
    });

// Load footer
fetch('components/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer-container').innerHTML = data;
    });

// Header logic (copied from index.js)
function initHeaderScripts() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const header = document.getElementById('main-header');
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Mobile menu toggle
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            mobileMenuBtn.innerHTML = navMenu.classList.contains('show') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu && mobileMenuBtn) {
                navMenu.classList.remove('show');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });

    // Dark mode toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const isDark = body.classList.contains('dark-mode');
            setTheme(isDark ? 'light' : 'dark');
        });
        // Apply saved theme on header load
        const savedTheme = localStorage.getItem('theme');
        setTheme(savedTheme === 'dark' ? 'dark' : 'light');
    }

    // Header scroll effect
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

// Dark mode persistence
function setTheme(mode) {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    if (mode === 'dark') {
        body.classList.add('dark-mode');
        if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    }
}

function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    setTheme(savedTheme === 'dark' ? 'dark' : 'light');
}

document.addEventListener('DOMContentLoaded', function() {
    applySavedTheme();
});
