// Animations module

// Add animation classes to elements
export function addAnimationClasses() {
    // Add animate-on-scroll class to elements that should animate
    const elementsToAnimate = document.querySelectorAll('.about-content, .work-filter, .contact-content, .home-content, .section-title, .tech-stack');
    
    elementsToAnimate.forEach(element => {
        element.classList.add('animate-on-scroll');
    });
    
    // Add staggered animation to work items
    const workItems = document.querySelectorAll('.work-item');
    workItems.forEach((item, index) => {
        item.classList.add('animate-on-scroll');
        item.style.setProperty('--item-index', index + 1);
    });
    
    // Set up Intersection Observer for element animations
    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                elementObserver.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -100px 0px' });
    
    // Observe all animatable elements
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        elementObserver.observe(element);
    });
}