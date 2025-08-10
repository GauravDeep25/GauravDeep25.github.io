document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Switcher Logic ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    function applyTheme() {
        const preferredTheme = localStorage.getItem('theme') || 'dark';
        if (preferredTheme === 'dark') {
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
            if (themeToggle) themeToggle.textContent = '☀️';
        } else {
            body.classList.add('light-mode');
            body.classList.remove('dark-mode');
            if (themeToggle) themeToggle.textContent = '🌙';
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDarkMode = body.classList.toggle('dark-mode');
            body.classList.toggle('light-mode', !isDarkMode);

            if (isDarkMode) {
                themeToggle.textContent = '☀️';
                localStorage.setItem('theme', 'dark');
            } else {
                themeToggle.textContent = '🌙';
                localStorage.setItem('theme', 'light');
            }
        });
    }

    applyTheme();

    // --- Mobile Menu Logic ---
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('open');
            mobileMenu.classList.toggle('open');
        });
    }

    // --- Form Submission Logic (No Redirect) ---
    const contactForm = document.getElementById('contact-form');

    async function handleFormSubmit(event) {
        event.preventDefault(); // Prevent the default redirect
        const form = event.target;
        const data = new FormData(form);
        const status = document.getElementById('form-status');

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                status.innerHTML = "Thanks for your submission!";
                status.className = 'success';
                form.reset();
            } else {
                const responseData = await response.json();
                if (Object.hasOwn(responseData, 'errors')) {
                    status.innerHTML = responseData["errors"].map(error => error["message"]).join(", ");
                } else {
                    status.innerHTML = "Oops! There was a problem submitting your form";
                }
                status.className = 'error';
            }
        } catch (error) {
            status.innerHTML = "Oops! There was a problem submitting your form";
            status.className = 'error';
        }
    }

    if (contactForm) {
        contactForm.addEventListener("submit", handleFormSubmit);
    }
});
