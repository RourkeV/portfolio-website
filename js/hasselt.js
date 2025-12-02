// Load header
fetch('components/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-container').innerHTML = data;
        initHeaderScripts();
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
            if (themeToggle) themeToggle.textContent = 'Light Mode';
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            if (themeToggle) themeToggle.textContent = 'Dark Mode';
            localStorage.setItem('theme', 'light');
        }
    }

    // Apply saved theme immediately
    const savedTheme = localStorage.getItem('theme');
    setTheme(savedTheme === 'dark' ? 'dark' : 'light');

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const isDark = document.body.classList.contains('dark-mode');
            setTheme(isDark ? 'light' : 'dark');
        });
    }
}
