// Emoji animation module

// DOM Elements
const emoji = document.querySelector('.emoji');

// Moving emoji animation
export function initEmojiMovement() {
    let xPosition = 0;
    let yPosition = 0;
    let xSpeed = 2;
    let ySpeed = 1.5;
    
    function moveEmoji() {
        const container = document.querySelector('.emoji-container');
        const containerRect = container.getBoundingClientRect();
        
        // Update position
        xPosition += xSpeed;
        yPosition += ySpeed;
        
        // Check boundaries and reverse direction if needed
        if (xPosition > 30 || xPosition < -30) {
            xSpeed = -xSpeed;
        }
        
        if (yPosition > 20 || yPosition < -20) {
            ySpeed = -ySpeed;
        }
        
        // Apply the new position
        emoji.style.transform = `translate(${xPosition}px, ${yPosition}px) rotate(0deg)`;
        
        requestAnimationFrame(moveEmoji);
    }
    
    moveEmoji();
}