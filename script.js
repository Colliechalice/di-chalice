document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close mobile menu when clicking a link
    const navLinksArray = document.querySelectorAll('.nav-links a');
    navLinksArray.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-links') && 
            !event.target.closest('.mobile-menu-btn') && 
            navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Testimonials functionality
    const testimonialAvatars = document.querySelectorAll('.avatar');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;

    // Initialize first testimonial
    function initializeTestimonials() {
        if (testimonialAvatars.length > 0 && testimonialCards.length > 0) {
            setActiveTestimonial(0);
        }
    }

    // Function to set active testimonial
    function setActiveTestimonial(index) {
        // Remove active class from all avatars and cards
        testimonialAvatars.forEach(avatar => avatar.classList.remove('active'));
        testimonialCards.forEach(card => {
            card.classList.remove('active');
        });

        // Add active class to current avatar and card
        testimonialAvatars[index].classList.add('active');
        testimonialCards[index].classList.add('active');
    }

    // Add click event to testimonial avatars
    testimonialAvatars.forEach((avatar, index) => {
        avatar.addEventListener('click', () => {
            currentTestimonial = index;
            setActiveTestimonial(index);
            clearInterval(testimonialInterval);
            testimonialInterval = startTestimonialRotation();
        });
    });

    // Auto-rotate testimonials
    function startTestimonialRotation() {
        return setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
            setActiveTestimonial(currentTestimonial);
        }, 5000);
    }

    let testimonialInterval = startTestimonialRotation();

    // Pause auto-rotation when hovering over testimonials
    const testimonialsContainer = document.querySelector('.testimonials-container');
    if (testimonialsContainer) {
        testimonialsContainer.addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });

        testimonialsContainer.addEventListener('mouseleave', () => {
            testimonialInterval = startTestimonialRotation();
        });
    }

    // Initialize testimonials
    initializeTestimonials();
});
