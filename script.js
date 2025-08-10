document.addEventListener('DOMContentLoaded', () => {
    // --- Side Panel Navigation Logic ---
    const menuToggle = document.getElementById('menu-toggle');
    const sidePanel = document.getElementById('side-panel');
    const overlay = document.getElementById('overlay');
    // Select all the navigation links inside the side panel
    const navLinks = document.querySelectorAll('.side-nav-links a');

    function openMenu() {
        menuToggle.classList.add('open');
        sidePanel.classList.add('open');
        overlay.classList.add('open');
    }

    function closeMenu() {
        menuToggle.classList.remove('open');
        sidePanel.classList.remove('open');
        overlay.classList.remove('open');
    }

    menuToggle.addEventListener('click', () => {
        if (sidePanel.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    overlay.addEventListener('click', closeMenu);

    // NEW: Add a click listener to each navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });


    // --- Form Submission Logic (No Redirect) ---
    const contactForm = document.getElementById('contact-form');

    async function handleFormSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);
        const status = document.getElementById('form-status');

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: data,
                headers: { 'Accept': 'application/json' }
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
