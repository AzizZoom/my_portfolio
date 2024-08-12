const menuBars = document.getElementById('menu-bars');
const overlay = document.getElementById('overlay');
const nav1 = document.getElementById('nav-1');
const nav2 = document.getElementById('nav-2');
const nav3 = document.getElementById('nav-3');
const nav4 = document.getElementById('nav-4');
const nav5 = document.getElementById('nav-5');
const nav6 = document.getElementById('nav-6');
const navItems = [nav1, nav2, nav3, nav4, nav5, nav6];

const projectItem = document.querySelectorAll('.projectItem');
const screenWidth = window.screen.width;

// Animate Nav Items In/Out
function navAnimation (direction1, direction2) {
    navItems.forEach((nav, i) => {
        nav.classList.replace(`slide-${direction1}-${i + 1}`, `slide-${direction2}-${i + 1}`);
    });
}

// Toggle Navigation
function toggleNav() {
    // Toggle: Menu Bars Open/Closed
    menuBars.classList.toggle('change');
    // Toogle: Menu Active
    overlay.classList.toggle('overlay-active');
    if (overlay.classList.contains('overlay-active')) {
        // Animate In - Overlay
        overlay.classList.replace('overlay-slide-left', 'overlay-slide-right');
        // Animate In - Nav Items
        navAnimation('out', 'in');
    } else {
        // Animate Out - Overlay
        overlay.classList.replace('overlay-slide-right', 'overlay-slide-left');
        // Animate Out - Nav Items
        navAnimation('in', 'out');
    }
}

// Function to check if the Grid is in the viewport (Mobile)
function isGridInViewport(item) {
    const rect = item.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Play video when it's Grid comes into the viewport (Mobile)
function checkVideosInView() {
    projectItem.forEach(item => {
        const video = item.querySelector('.projectVideo');
        if (isGridInViewport(item)) {
            video.play();
        } else {
            video.pause();
        }
    });
}

// Check If The Device is a Mobile/Tablet or a Desktop
function isMobile() {
    // If screenWidth is less than 1025, it is a mobile. Else it is a desktop
    if(screenWidth < 1025) {
        // Add event listeners for scroll and resize (Mobile)
        window.addEventListener('scroll', checkVideosInView);
        window.addEventListener('resize', checkVideosInView);
        // Initial check
        checkVideosInView();
    } else {
        // Add event listeners for mouseenter and mouseleave (Desktop)
        projectItem.forEach(item => {
            const video = item.querySelector('.projectVideo');
            // Play Video On Hover
            item.addEventListener('mouseenter', () => {
                video.play();
            });
            // Reset Video On Hover
            item.addEventListener('mouseleave', () => {
                video.pause();
            });
        });
    }
}

// Event Listeners
menuBars.addEventListener('click', toggleNav);
navItems.forEach((nav) => {
    nav.addEventListener('click', toggleNav);
});
isMobile();
