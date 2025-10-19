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

// Modal functionality
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const galleryItems = document.querySelectorAll('.gallery-item img');
const closeBtn = document.querySelector('.close');

// Add click event to all gallery images
galleryItems.forEach(img => {
    img.addEventListener('click', function() {
        modal.style.display = 'block';
        modalImg.src = this.src;
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
});

// Close modal when clicking the X
closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
});

// Close modal when clicking outside the image
modal.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Image modal functionality for all images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.image-placeholder img');
    images.forEach(img => {
        img.addEventListener('click', function() {
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <span class="close">&times;</span>
                <img class="modal-content" src="${this.src}">
            `;
            document.body.appendChild(modal);
            
            modal.querySelector('.close').onclick = function() {
                modal.remove();
            };
            
            modal.onclick = function(e) {
                if (e.target === modal) {
                    modal.remove();
                }
            };
        });
    });
});
