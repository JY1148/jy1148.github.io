// src/utils/script.js
// Simplified scroll fade-in logic for React
export const initScripts = () => {
    // Basic Intersection Observer for fade-in animations on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active'); // Add active class to trigger CSS transitions
                // entry.target.classList.remove('inactive'); 
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.onscroll-image-fade-in, .onscroll-fade-in');
    sections.forEach(section => {
        observer.observe(section);
    });
};
