// Header scripts

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const header = document.getElementById('main-header');
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('show');
        mobileMenuBtn.innerHTML = navMenu.classList.contains('show') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('show');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Theme toggle functionality - ENHANCED
    function setTheme(mode) {
        if (mode === 'dark') {
            body.classList.add('dark-mode');
            themeToggle.textContent = 'Light Mode';
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            themeToggle.textContent = 'Dark Mode';
            localStorage.setItem('theme', 'light');
        }
    }

    themeToggle.addEventListener('click', function() {
        const isDark = body.classList.contains('dark-mode');
        setTheme(isDark ? 'light' : 'dark');
    });

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        setTheme('dark');
    } else {
        setTheme('light');
    }

    // Create more animated background elements
    function createBgElements() {
        const bgContainer = document.querySelector('.header-bg-elements');
        const colors = ['#3498db', '#9b59b6', '#e74c3c', '#f39c12', '#2ecc71'];

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
});
