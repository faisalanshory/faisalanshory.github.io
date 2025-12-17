// Main JavaScript file - Imports all modular JS files

// Import modules
import { initCursor } from './modules/cursor.js';
import { typingEffect } from './modules/typing.js';
import { initEmojiMovement } from './modules/emoji.js';
import { initSectionTransitions, animateSectionElements } from './modules/sections.js';
import { initWorkFilter } from './modules/work.js';
import { initContactForm } from './modules/contact.js';
import { addAnimationClasses } from './modules/animations.js';
import { initTheme } from './modules/theme.js';
import { updateJakartaTime } from './modules/time.js';

// Initialize the website
document.addEventListener('DOMContentLoaded', () => {
    // Initialize custom cursor
    initCursor();
    
    // Initialize typing effect
    typingEffect();
    
    // Initialize emoji animation
    initEmojiMovement();
    
    // Initialize section transitions
    initSectionTransitions();
    
    // Initialize work filter
    initWorkFilter();
    
    // Initialize form submission
    initContactForm();
    
    // Add animation classes to elements
    addAnimationClasses();
    
    // Check for saved theme preference
    initTheme();
    
    // Set up observer for section element animations
    const sections = document.querySelectorAll('.section');
    const sectionElementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSectionElements(entry.target);
                sectionElementObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    // Observe all sections for element animations
    sections.forEach(section => {
        sectionElementObserver.observe(section);
    });
    
    // Update Jakarta time in footer
    updateJakartaTime();
    setInterval(updateJakartaTime, 1000);
});