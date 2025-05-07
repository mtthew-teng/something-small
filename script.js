// Get elements
const wrapper = document.querySelector('.wrapper');
const letter = document.querySelector('.letter');
const expandedOverlay = document.querySelector('.expanded-overlay');
const expandedLetter = document.querySelector('.expanded-letter');
const closeBtn = document.querySelector('.close-btn');

// State variables
let envelopeOpened = false;
let hoverTimer = null;

// Track when hover starts
wrapper.addEventListener('mouseenter', () => {
    // Clear any existing timer
    clearTimeout(hoverTimer);
    
    // Set a timeout to match the hover animation duration
    hoverTimer = setTimeout(() => {
        envelopeOpened = true;
        wrapper.classList.add('envelope-opened');
    }, 750); // Match the total time for hover animation to complete
});

// Track when hover ends - close the envelope if the letter isn't expanded
wrapper.addEventListener('mouseleave', () => {
    // Clear the timer if mouse leaves before animation completes
    clearTimeout(hoverTimer);
    
    // Only close if the expanded letter isn't showing
    if (!expandedOverlay.classList.contains('active')) {
        envelopeOpened = false;
        wrapper.classList.remove('envelope-opened');
    }
});

// Make both the letter and the wrapper clickable
function handleClick() {
    // Only allow click if envelope has been opened
    if (envelopeOpened) {
        expandedOverlay.classList.add('active');
    }
}

// Add click event to letter
letter.addEventListener('click', handleClick);

// Add click event to wrapper, but only trigger if envelope is opened
wrapper.addEventListener('click', (event) => {
    // Don't trigger if clicking on the letter (to avoid double events)
    if (event.target !== letter && envelopeOpened) {
        handleClick();
    }
});

// Function to close the envelope
function closeEnvelope() {
    envelopeOpened = false;
    wrapper.classList.remove('envelope-opened');
}

// Close expanded letter when clicking close button
closeBtn.addEventListener('click', (event) => {
    expandedOverlay.classList.remove('active');
    // Close the envelope after letter is closed
    closeEnvelope();
    event.stopPropagation();
});

// Close expanded letter when clicking outside
expandedOverlay.addEventListener('click', (event) => {
    if (event.target === expandedOverlay) {
        expandedOverlay.classList.remove('active');
        // Close the envelope after letter is closed
        closeEnvelope();
    }
});