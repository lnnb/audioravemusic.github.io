/**
 * Custom Smooth Scrolling
 * Replaces default CSS scroll-behavior for a smoother, slower effect.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Select all links with hashes
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            // Only prevent default if the link is to an element on the same page
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            // If it's a link to another page with a hash (e.g. index.html#about), let it behave normally
            // But if we are on index.html and click #about, we want smooth scroll.
            // The selector `a[href^="#"]` ensures we only get local anchors.

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();

                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }

                const navbarHeight = 80; // Approx 5rem
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 1500; // Duration in ms (slower than default)
                let start = null;

                // Easing function: easeInOutQuart
                const easeInOutQuart = (t, b, c, d) => {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t * t * t + b;
                    t -= 2;
                    return -c / 2 * (t * t * t * t - 2) + b;
                };

                const animation = (currentTime) => {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const run = easeInOutQuart(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                };

                requestAnimationFrame(animation);
            }
        });
    });
});
