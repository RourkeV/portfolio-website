// Load header
fetch('components/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-container').innerHTML = data;
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
// Header logic
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

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu && mobileMenuBtn) {
                navMenu.classList.remove('show');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });

    // Header scroll effect
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) header.classList.add('scrolled');
            else header.classList.remove('scrolled');
        });
    }

    // Dark mode persistence
    function setTheme(mode) {
        if (mode === 'dark') {
            body.classList.add('dark-mode');
            if (themeToggle) themeToggle.textContent = 'Light Mode';
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            if (themeToggle) themeToggle.textContent = 'Dark Mode';
            localStorage.setItem('theme', 'light');
        }
    }

    // Apply saved theme once on load
    const savedTheme = localStorage.getItem('theme');
    setTheme(savedTheme === 'dark' ? 'dark' : 'light');

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const isDark = body.classList.contains('dark-mode');
            setTheme(isDark ? 'light' : 'dark');
        });
    }

    // Create some animated background elements
    function createBgElements() {
        const bgContainer = document.querySelector('.header-bg-elements');
        const colors = ['#3498db', '#9b59b6', '#e74c3c', '#f39c12', '#2ecc71'];
        if (!bgContainer) return;
        for (let i = 0; i < 8; i++) {
            const size = Math.random() * 30 + 10;
            const element = document.createElement('div');
            element.classList.add('bg-element');
            element.style.width = `${size}px`;
            element.style.height = `${size}px`;
            element.style.background = colors[Math.floor(Math.random() * colors.length)];
            element.style.top = `${Math.random() * 100}%`;
            element.style.left = `${Math.random() * 100}%`;
            element.style.animationDelay = `${Math.random() * 5}s`;
            element.style.animationDuration = `${15 + Math.random() * 10}s`;
            bgContainer.appendChild(element);
        }
    }
    createBgElements();
}
