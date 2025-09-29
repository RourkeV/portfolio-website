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

    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const isDark = body.classList.contains('dark-mode');
            setTheme(isDark ? 'light' : 'dark');
        });
        // Apply saved theme on header load
        const savedTheme = localStorage.getItem('theme');
        setTheme(savedTheme === 'dark' ? 'dark' : 'light');
    }
}
