/**
 * Hero Parallax Effect
 * Adapted from Aceternity UI (React) to Vanilla JS
 */

document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero-parallax');
    const parallaxContainer = document.querySelector('.parallax-container');
    const row1 = document.querySelector('.parallax-row-1');
    const row2 = document.querySelector('.parallax-row-2');
    const row3 = document.querySelector('.parallax-row-3');
    const row4 = document.querySelector('.parallax-row-4');
    const row5 = document.querySelector('.parallax-row-5');

    if (!heroSection || !parallaxContainer) return;

    // Optimization: Disable parallax on small screens (mobile)
    if (window.innerWidth < 768) return;

    // Configuration
    const config = {
        rotateX: { start: 15, end: 0 },
        rotateZ: { start: 20, end: 0 },
        translateY: { start: -700, end: 500 }, // Adjusted back to -700 to center the 5-row grid
        opacity: { start: 0.2, end: 1 },
        translateX: { start: 0, end: 1000 },
    };

    let scrollY = 0;
    let heroRect = heroSection.getBoundingClientRect();
    let heroHeight = heroRect.height;
    let windowHeight = window.innerHeight;

    // Update dimensions on resize
    window.addEventListener('resize', () => {
        heroRect = heroSection.getBoundingClientRect();
        heroHeight = heroRect.height;
        windowHeight = window.innerHeight;
    });

    function updateParallax() {
        scrollY = window.scrollY;

        let progress = scrollY / (heroHeight * 0.8);
        if (progress < 0) progress = 0;
        if (progress > 1) progress = 1;

        // Calculate values based on progress
        const rotateX = config.rotateX.start - (progress * (config.rotateX.start - config.rotateX.end));
        const rotateZ = config.rotateZ.start - (progress * (config.rotateZ.start - config.rotateZ.end));
        const translateY = config.translateY.start + (progress * (config.translateY.end - config.translateY.start));
        const opacity = config.opacity.start + (progress * (config.opacity.end - config.opacity.start));

        let fastProgress = scrollY / (heroHeight * 0.4);
        if (fastProgress > 1) fastProgress = 1;

        const currentRotateX = config.rotateX.start - (fastProgress * (config.rotateX.start - config.rotateX.end));
        const currentRotateZ = config.rotateZ.start - (fastProgress * (config.rotateZ.start - config.rotateZ.end));
        const currentOpacity = config.opacity.start + (fastProgress * (config.opacity.end - config.opacity.start));
        const currentTranslateY = config.translateY.start + (fastProgress * (config.translateY.end - config.translateY.start));

        parallaxContainer.style.transform = `
            rotateX(${currentRotateX}deg) 
            rotateZ(${currentRotateZ}deg) 
            translateY(${currentTranslateY}px)
        `;
        parallaxContainer.style.opacity = currentOpacity;

        // Apply transforms to rows (Horizontal movement)
        const rowTranslate = scrollY * 0.5;

        // Alternating directions
        // Alternating directions
        if (row1) row1.style.transform = `translateX(${rowTranslate}px)`;
        if (row2) row2.style.transform = `translateX(-${rowTranslate}px)`;
        if (row3) row3.style.transform = `translateX(${rowTranslate}px)`;
        if (row4) row4.style.transform = `translateX(-${rowTranslate}px)`;
        if (row5) row5.style.transform = `translateX(${rowTranslate}px)`;

        requestAnimationFrame(updateParallax);
    }

    // Initialize
    requestAnimationFrame(updateParallax);
});
