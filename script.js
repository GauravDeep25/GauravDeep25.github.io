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

    // --- Timeline Navigation Logic ---
    const timelineNav = document.getElementById('timeline-nav');
    const sections = document.querySelectorAll('section');
    const timelineLinks = document.querySelectorAll('.timeline-link');

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                timelineNav.classList.add('visible');
            }
            // Hide timeline if scrolling back to the top (hero section)
            if (window.scrollY < 500) {
                 timelineNav.classList.remove('visible');
            }
        });
    }, { threshold: 0.1 });

    // Observe the first section after the hero
    if (document.getElementById('education')) {
        timelineObserver.observe(document.getElementById('education'));
    }

    // Highlight active link on scroll
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                timelineLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: '-50% 0px -50% 0px' });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });


    // --- Form Submission Logic ---
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
