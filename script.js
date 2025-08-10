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
    let touchTimeout;

    // Function to show the timeline
    function showTimeline() {
        timelineNav.classList.add('visible');
    }

    // Function to hide the timeline
    function hideTimeline() {
        timelineNav.classList.remove('visible');
    }

    // Logic for Touch Devices (Mobile)
    if ('ontouchstart' in window) {
        document.addEventListener('touchstart', () => {
            showTimeline();
            // Clear any existing timer
            clearTimeout(touchTimeout);
            // Set a new timer to hide the timeline after 3 seconds of inactivity
            touchTimeout = setTimeout(hideTimeline, 3000);
        });
    } 
    // Logic for Non-Touch Devices (PC)
    else {
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Show timeline if scrolling past the first main section
                if (entry.isIntersecting && window.scrollY > 500) {
                    showTimeline();
                } else if (window.scrollY < 500) {
                    hideTimeline();
                }
            });
        }, { threshold: 0.1 });

        if (document.getElementById('education')) {
            scrollObserver.observe(document.getElementById('education'));
        }
    }

    // Logic to highlight the active link (works for both mobile and PC)
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
