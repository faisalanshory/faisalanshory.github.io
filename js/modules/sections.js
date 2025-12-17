// Sections transitions module

// DOM Elements
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('nav ul li a');

// Scroll tracking variables
let lastScrollTop = 0;
let scrollDirection = 'down';

// Section transitions with scroll-triggered animations
export function initSectionTransitions() {
    // Show all sections initially
    sections.forEach(section => {
        section.classList.add('visible');
    });
    
    // Track scroll direction
    window.addEventListener('scroll', () => {
        const st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > lastScrollTop) {
            scrollDirection = 'down';
        } else {
            scrollDirection = 'up';
        }
        lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    });
    
    // Set up Intersection Observer for scroll animations
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // When section is in view
            if (entry.isIntersecting) {
                const currentSection = entry.target;
                const sectionId = '#' + currentSection.id;
                
                // Update active nav link
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === sectionId) {
                        link.classList.add('active');
                    }
                });
                
                // Add animation class based on scroll direction
                currentSection.classList.add('in-view');
                currentSection.setAttribute('data-scroll-direction', scrollDirection);
            } else {
                // Remove animation class when section is out of view
                // but keep the 'visible' class so it's still in the DOM
                entry.target.classList.remove('in-view');
            }
        });
    }, { threshold: 0.2 }); // Trigger when 20% of the section is visible
    
    // Observe all sections
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Navigation click events for smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add animation to section elements when they come into view
export function animateSectionElements(section) {
    const animatableElements = section.querySelectorAll('.animate-on-scroll');
    
    animatableElements.forEach((element, index) => {
        // Add staggered delay based on index
        setTimeout(() => {
            element.classList.add('animated');
        }, 150 * index);
    });
}