// Theme module

// DOM Elements
const themeToggle = document.querySelector('.theme-toggle');
const cursor = document.querySelector('.cursor');

// Theme toggle functionality
export function initTheme() {
    // Check for saved theme preference
    const darkModeStored = localStorage.getItem('darkMode');
    
    if (darkModeStored === 'false') {
        document.body.classList.add('light-mode');
        themeToggle.classList.add('active');
        cursor.style.backgroundColor = 'rgba(77, 171, 247, 0.5)';
        cursor.style.mixBlendMode = 'normal';
    }
    
    // Add event listener for theme toggle
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        themeToggle.classList.toggle('active');
        
        // Save theme preference to localStorage
        const isDarkMode = !document.body.classList.contains('light-mode');
        localStorage.setItem('darkMode', isDarkMode);
        
        // Update cursor color based on theme
        if (document.body.classList.contains('light-mode')) {
            cursor.style.backgroundColor = 'rgba(77, 171, 247, 0.5)';
            cursor.style.mixBlendMode = 'normal';
        } else {
            cursor.style.backgroundColor = 'rgba(77, 171, 247, 0.5)';
            cursor.style.mixBlendMode = 'difference';
        }
    });
}