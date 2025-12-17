// Typing effect module

// DOM Elements
const typingNameElement = document.querySelector('.typing-name');

// Typing Effect Variables
const nameText = 'Faisal';
let nameCharIndex = 0;
let isTypingName = true;
let typingNameDelay = 200;

// Typing effect function
export function typingEffect() {
    if (isTypingName) {
        // Add a character to name
        typingNameElement.textContent = nameText.substring(0, nameCharIndex + 1);
        nameCharIndex++;
        typingNameDelay = 200; // Normal speed when typing
        
        // If name is complete, reset after a pause
        if (nameCharIndex === nameText.length) {
            isTypingName = false;
            typingNameDelay = 2000; // Longer pause at the end
        }
    } else {
        // Reset to start typing again
        nameCharIndex = 0;
        isTypingName = true;
        typingNameDelay = 500; // Pause before starting again
    }
    
    setTimeout(typingEffect, typingNameDelay);
}