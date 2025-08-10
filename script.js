document.addEventListener('DOMContentLoaded', () => {
    // --- Read More Logic ---
    const readMoreBtn = document.getElementById('read-more-btn');
    const aboutDetails = document.getElementById('about-details');

    if (readMoreBtn && aboutDetails) {
        readMoreBtn.addEventListener('click', () => {
            aboutDetails.classList.toggle('visible');
            if (aboutDetails.classList.contains('visible')) {
                readMoreBtn.textContent = 'Read Less';
            } else {
                readMoreBtn.textContent = 'Read More';
            }
        });
    }

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
