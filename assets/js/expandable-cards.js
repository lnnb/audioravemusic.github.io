/**
 * Expandable Cards Effect
 * Adapted from Aceternity UI (React) to Vanilla JS
 * Uses FLIP (First, Last, Invert, Play) animation technique
 */

document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    let activeCard = null;
    let overlay = null;
    let backdrop = null;

    // Create backdrop element
    backdrop = document.createElement('div');
    backdrop.className = 'expanded-card-backdrop';
    document.body.appendChild(backdrop);

    // Close on backdrop click
    backdrop.addEventListener('click', closeCard);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && activeCard) {
            closeCard();
        }
    });

    // Event delegation for gallery items
    document.addEventListener('click', (e) => {
        const item = e.target.closest('.gallery-item');
        if (item) {
            console.log('Gallery item clicked (delegated):', item);
            e.preventDefault();
            openCard(item);
        }
    });

    function openCard(item) {
        if (activeCard) return;
        activeCard = item;

        // 1. Get initial state (First)
        const img = item.querySelector('img');
        const initialRect = img.getBoundingClientRect();

        // 2. Create the expanded card (Last)
        overlay = document.createElement('div');
        overlay.className = 'expanded-card';

        // Stop propagation on card click so it doesn't trigger backdrop close
        overlay.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // Get content from data attributes or fallback
        const title = item.getAttribute('data-title') || 'Unknown Title';
        const description = item.getAttribute('data-description') || 'Release description goes here. This is a placeholder text for the expanded view.';
        const imgSrc = img.src;

        overlay.innerHTML = `
            <button class="expanded-card-close">&times;</button>
            <div class="expanded-card-image-container">
                <img src="${imgSrc}" alt="${title}">
            </div>
            <div class="expanded-card-content">
                <h3>${title}</h3>
                <p>${description}</p>
                <div class="flex flex-nowrap gap-2 mt-4 justify-center w-full" id="platform-buttons-container">
                    <a href="#" class="platform-btn beatport-btn" data-platform="beatport">
                        <i class="bi bi-music-note-beamed"></i> Beatport
                    </a>
                    <a href="#" class="platform-btn soundcloud-btn" data-platform="soundcloud">
                        <i class="bi bi-cloud-fill"></i> SoundCloud
                    </a>
                    <a href="#" class="platform-btn spotify-btn" data-platform="spotify">
                        <i class="bi bi-spotify"></i> Spotify
                    </a>
                </div>
                <div id="player-container" class="hidden mt-4 w-full flex flex-col items-center gap-2"></div>
            </div>
        `;

        // Append to backdrop
        backdrop.appendChild(overlay);

        // Handle platform button clicks
        const buttonsContainer = overlay.querySelector('#platform-buttons-container');
        const playerContainer = overlay.querySelector('#player-container');
        const buttons = buttonsContainer.querySelectorAll('.platform-btn');

        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation(); // Prevent card close

                const platform = btn.getAttribute('data-platform');
                let iframeCode = '';

                if (platform === 'spotify') {
                    iframeCode = '<iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/track/0ObRq0q8YgB6VHlSxL5n8M?utm_source=generator" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>';
                } else if (platform === 'soundcloud') {
                    iframeCode = '<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2032387172&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/pollux_arg" title="Pollux (Arg)" target="_blank" style="color: #cccccc; text-decoration: none;">Pollux (Arg)</a> · <a href="https://soundcloud.com/pollux_arg/pollux-arg-time-to-change-original-mix-audiorave-records" title="Pollux (Arg) - Time to change (Original Mix) [Audiorave Records]" target="_blank" style="color: #cccccc; text-decoration: none;">Pollux (Arg) - Time to change (Original Mix) [Audiorave Records]</a></div>';
                } else if (platform === 'beatport') {
                    iframeCode = '<iframe src="https://embed.beatport.com/?id=20060430&type=track" width="100%" height="162" frameborder="0" scrolling="no" style="max-width:600px;"></iframe>';
                }

                if (iframeCode) {
                    playerContainer.innerHTML = iframeCode + '<button class="back-btn text-sm text-gray-400 hover:text-white mt-2 flex items-center gap-1"><i class="bi bi-arrow-left"></i> Back to options</button>';

                    buttonsContainer.classList.add('hidden');
                    playerContainer.classList.remove('hidden');

                    // Back button logic
                    playerContainer.querySelector('.back-btn').addEventListener('click', (ev) => {
                        ev.stopPropagation();
                        playerContainer.classList.add('hidden');
                        playerContainer.innerHTML = ''; // Stop playback
                        buttonsContainer.classList.remove('hidden');
                    });
                }
            });
        });

        // Close button listener
        overlay.querySelector('.expanded-card-close').addEventListener('click', closeCard);

        // Show backdrop to calculate final dimensions
        backdrop.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Get final dimensions
        const finalRect = overlay.getBoundingClientRect();

        // 3. Set Initial State (Invert)
        // Use fixed positioning to animate from thumbnail position
        overlay.style.position = 'fixed';
        overlay.style.top = `${initialRect.top}px`;
        overlay.style.left = `${initialRect.left}px`;
        overlay.style.width = `${initialRect.width}px`;
        overlay.style.height = `${initialRect.height}px`;
        overlay.style.margin = '0'; // Reset any margins

        // Hide original
        activeCard.style.opacity = '0';

        // Force reflow
        overlay.offsetHeight;

        // 4. Play Animation
        overlay.style.transition = 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
        overlay.style.top = `${finalRect.top}px`;
        overlay.style.left = `${finalRect.left}px`;
        overlay.style.width = `${finalRect.width}px`;
        overlay.style.height = `${finalRect.height}px`;

        // Cleanup after animation
        overlay.addEventListener('transitionend', function cleanup() {
            overlay.removeEventListener('transitionend', cleanup);
            // Revert to relative positioning inside flex container
            overlay.style.position = '';
            overlay.style.top = '';
            overlay.style.left = '';
            overlay.style.width = '';
            overlay.style.height = '';
            overlay.style.transition = '';
        }, { once: true });
    }

    function closeCard() {
        if (!activeCard || !overlay) return;

        // Get current state (should be centered)
        const currentRect = overlay.getBoundingClientRect();

        // Get target state (original thumbnail)
        // Get target state (original thumbnail)
        // const img = activeCard.querySelector('img'); // Changed to use activeCard for proper size
        const targetRect = activeCard.getBoundingClientRect();

        // Set explicit styles for animation start (in case it was relative)
        overlay.style.position = 'fixed';
        overlay.style.top = `${currentRect.top}px`;
        overlay.style.left = `${currentRect.left}px`;
        overlay.style.width = `${currentRect.width}px`;
        overlay.style.height = `${currentRect.height}px`;
        overlay.style.margin = '0';

        // Force reflow
        overlay.offsetHeight;

        // Animate to target
        overlay.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        overlay.style.top = `${targetRect.top}px`;
        overlay.style.left = `${targetRect.left}px`;
        overlay.style.width = `${targetRect.width}px`;
        overlay.style.height = `${targetRect.height}px`;

        // Fade out content
        const content = overlay.querySelector('.expanded-card-content');
        const closeBtn = overlay.querySelector('.expanded-card-close');
        if (content) content.style.opacity = '0';
        if (closeBtn) closeBtn.style.opacity = '0';

        backdrop.classList.remove('active');
        document.body.style.overflow = '';

        // Remove after transition
        setTimeout(() => {
            if (overlay) {
                overlay.remove();
                overlay = null;
            }
            if (activeCard) {
                activeCard.style.opacity = '';
                activeCard = null;
            }
        }, 300);
    }
});
