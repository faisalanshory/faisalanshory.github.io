// Image Popup Module

// Create popup elements
const createPopupElements = () => {
    // Create popup container
    const popupOverlay = document.createElement('div');
    popupOverlay.className = 'image-popup-overlay';
    
    // Create popup content
    const popupContent = document.createElement('div');
    popupContent.className = 'image-popup-content';
    
    // Create close button
    const closeButton = document.createElement('button');
    closeButton.className = 'image-popup-close';
    closeButton.innerHTML = '&times;';
    closeButton.setAttribute('aria-label', 'Close popup');
    
    // Create image container
    const imageContainer = document.createElement('div');
    imageContainer.className = 'image-popup-image-container';
    
    // Create image element
    const image = document.createElement('img');
    image.className = 'image-popup-image';
    
    // Create info container
    const infoContainer = document.createElement('div');
    infoContainer.className = 'image-popup-info';
    
    // Create title
    const title = document.createElement('h3');
    title.className = 'image-popup-title';
    
    // Create description
    const description = document.createElement('p');
    description.className = 'image-popup-description';
    
    // Append elements
    imageContainer.appendChild(image);
    infoContainer.appendChild(title);
    infoContainer.appendChild(description);
    popupContent.appendChild(closeButton);
    popupContent.appendChild(imageContainer);
    popupContent.appendChild(infoContainer);
    popupOverlay.appendChild(popupContent);
    
    // Add to body
    document.body.appendChild(popupOverlay);
    
    // Add CSS if not already added
    if (!document.querySelector('link[href="/css/modules/popup.css"]')) {
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = '/css/modules/popup.css';
        document.head.appendChild(cssLink);
    }
    
    return {
        overlay: popupOverlay,
        content: popupContent,
        closeButton: closeButton,
        image: image,
        title: title,
        description: description
    };
};

// Popup elements reference
let popupElements = null;

// Initialize popup
export function initImagePopup() {
    // Create popup elements if they don't exist
    if (!popupElements) {
        popupElements = createPopupElements();
        
        // Add event listeners
        popupElements.closeButton.addEventListener('click', closePopup);
        popupElements.overlay.addEventListener('click', (e) => {
            if (e.target === popupElements.overlay) {
                closePopup();
            }
        });
        
        // Add keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closePopup();
            }
        });
    }
}

// Open popup
export function openImagePopup(imageUrl, title, description) {
    // Initialize if not already initialized
    if (!popupElements) {
        initImagePopup();
    }
    
    // Set content
    popupElements.image.src = imageUrl;
    popupElements.title.textContent = title || '';
    popupElements.description.textContent = description || '';
    
    // Show popup
    popupElements.overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    
    // Focus on close button for accessibility
    popupElements.closeButton.focus();
}

// Close popup
export function closePopup() {
    if (popupElements) {
        popupElements.overlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}