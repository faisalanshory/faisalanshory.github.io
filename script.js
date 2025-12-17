// DOM Elements
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('nav ul li a');
const filterBtns = document.querySelectorAll('.filter-btn');
const themeToggle = document.querySelector('.theme-toggle');
const cursor = document.querySelector('.cursor');
const emoji = document.querySelector('.emoji');
const typingElement = document.querySelector('.typing');

// Scroll tracking variables
let lastScrollTop = 0;
let scrollDirection = 'down';

// Typing Effect Variables
const words = ['Developer', 'Designer', 'Creator', 'Freelancer'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 200;



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
    checkThemePreference();
    

});

// Custom cursor
function initCursor() {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });
    
    document.addEventListener('mousedown', () => {
        cursor.style.width = '15px';
        cursor.style.height = '15px';
        cursor.style.backgroundColor = 'rgba(255, 101, 132, 0.5)';
    });
    
    document.addEventListener('mouseup', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.backgroundColor = 'rgba(77, 171, 247, 0.5)';
    });
    
    // Hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .tech-item, .work-item, input, textarea');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.backgroundColor = 'rgba(77, 171, 247, 0.2)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.backgroundColor = 'rgba(77, 171, 247, 0.5)';
        });
    });
}

// Typing effect
function typingEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        // Remove a character
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 100; // Faster when deleting
    } else {
        // Add a character
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 200; // Normal speed when typing
    }
    
    // If word is complete, start deleting after a pause
    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typingDelay = 1000; // Pause at the end of the word
    }
    
    // If deletion is complete, move to the next word
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingDelay = 500; // Pause before starting the next word
    }
    
    setTimeout(typingEffect, typingDelay);
}

// Moving emoji animation
function initEmojiMovement() {
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

// Section transitions with scroll-triggered animations
function initSectionTransitions() {
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
function animateSectionElements(section) {
    const animatableElements = section.querySelectorAll('.animate-on-scroll');
    
    animatableElements.forEach((element, index) => {
        // Add staggered delay based on index
        setTimeout(() => {
            element.classList.add('animated');
        }, 150 * index);
    });
}

// Work filter and pagination functionality
function initWorkFilter() {
    const workGrid = document.getElementById('work-grid');
    const paginationContainer = document.getElementById('work-pagination');
    
    if (!filterBtns.length || !workItems.length || !workGrid || !paginationContainer) return;
    
    const itemsPerPage = 6; // Show 6 items per page (2 rows of 3 items)
    let currentPage = 1;
    let currentFilter = 'all';
    let filteredItems = [];
    
    // Filter work items based on category
    function filterItems(filterValue) {
        currentFilter = filterValue;
        currentPage = 1; // Reset to first page when filter changes
        
        filteredItems = Array.from(workItems).filter(item => {
            return filterValue === 'all' || item.classList.contains(filterValue);
        });
        
        updatePagination();
        displayItems();
    }
    
    // Update pagination buttons
    function updatePagination() {
        const pageCount = Math.ceil(filteredItems.length / itemsPerPage);
        paginationContainer.innerHTML = '';
        
        // Only show pagination if we have more than one page
        if (pageCount <= 1) {
            paginationContainer.style.display = 'none';
            return;
        }
        
        paginationContainer.style.display = 'flex';
        
        // Add previous button
        if (pageCount > 1) {
            const prevBtn = document.createElement('button');
            prevBtn.classList.add('pagination-btn');
            prevBtn.innerHTML = '&lt;';
            prevBtn.addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    displayItems();
                    updateActivePaginationBtn();
                }
            });
            paginationContainer.appendChild(prevBtn);
        }
        
        // Add page buttons
        for (let i = 1; i <= pageCount; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.classList.add('pagination-btn');
            if (i === currentPage) pageBtn.classList.add('active');
            pageBtn.textContent = i;
            pageBtn.addEventListener('click', () => {
                currentPage = i;
                displayItems();
                updateActivePaginationBtn();
            });
            paginationContainer.appendChild(pageBtn);
        }
        
        // Add next button
        if (pageCount > 1) {
            const nextBtn = document.createElement('button');
            nextBtn.classList.add('pagination-btn');
            nextBtn.innerHTML = '&gt;';
            nextBtn.addEventListener('click', () => {
                if (currentPage < pageCount) {
                    currentPage++;
                    displayItems();
                    updateActivePaginationBtn();
                }
            });
            paginationContainer.appendChild(nextBtn);
        }
    }
    
    // Update active pagination button
    function updateActivePaginationBtn() {
        const paginationBtns = document.querySelectorAll('.pagination-btn');
        paginationBtns.forEach((btn, index) => {
            // Skip first and last buttons (prev/next)
            if (index === 0 || index === paginationBtns.length - 1) return;
            
            if (index === currentPage) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
    
    // Display items for current page
    function displayItems() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const itemsToShow = filteredItems.slice(startIndex, endIndex);
        
        // Hide all items first
        workItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        });
        
        // Show filtered items for current page
        setTimeout(() => {
            itemsToShow.forEach((item, index) => {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 50 * index); // Staggered animation
            });
        }, 350);
    }
    
    // Add event listeners to filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            filterItems(filterValue);
        });
    });
    
    // Set initial filter
    filterItems('all');
    filterBtns[0].classList.add('active');
}

// Contact form submission
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // In a real application, you would send the form data to a server
            // For this demo, we'll just show a success message
            const formData = new FormData(contactForm);
            const formValues = {};
            
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            // Simulate form submission
            contactForm.innerHTML = `<div class="form-success"><i class="fas fa-check-circle"></i><h3>Message Sent!</h3><p>Thank you for reaching out, ${formValues.name}. I'll get back to you soon!</p></div>`;
        });
    }
}

// Add animation classes to elements
function addAnimationClasses() {
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

// Theme toggle functionality
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

// Check for saved theme preference
function checkThemePreference() {
    const darkModeStored = localStorage.getItem('darkMode');
    
    if (darkModeStored === 'false') {
        document.body.classList.add('light-mode');
        themeToggle.classList.add('active');
        cursor.style.backgroundColor = 'rgba(77, 171, 247, 0.5)';
        cursor.style.mixBlendMode = 'normal';
    }
}



// Call animateSectionElements when a section comes into view
document.addEventListener('DOMContentLoaded', () => {
    // Set up observer for section element animations
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

// Function to update Jakarta time
function updateJakartaTime() {
    const jakartaTimeElement = document.getElementById('jakarta-time');
    if (jakartaTimeElement) {
        const options = {
            timeZone: 'Asia/Jakarta',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };
        const jakartaTime = new Date().toLocaleTimeString('en-US', options);
        jakartaTimeElement.textContent = jakartaTime;
    }
}