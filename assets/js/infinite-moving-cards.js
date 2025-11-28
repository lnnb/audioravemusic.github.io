const releases = [
    { id: 40, title: "Filhas da Mata", description: "Pandora Plur" },
    { id: 39, title: "Move", description: "Asporit" },
    { id: 38, title: "Inmensidad", description: "Niandra" },
    { id: 37, title: "Desdoblamiento Cuantico", description: "Another Freak" },
    { id: 36, title: "Healing", description: "Anthrax" },
    { id: 35, title: "Om", description: "Metatones" },
    { id: 34, title: "Amazonia", description: "Tomasian" },
    { id: 33, title: "Smash It", description: "Pollux & Reach Moment" },
    { id: 32, title: "Off The Map", description: "Niandra" },
    { id: 31, title: "Lost In Your Eyes", description: "Anthrax" },
    { id: 30, title: "Can't Ignore", description: "Another Crazy & Atalli" },
    { id: 29, title: "Time Out", description: "Monster Dog & Ritter" },
    { id: 28, title: "Reflejo", description: "Harrizon" },
    { id: 27, title: "Crazy In Space", description: "Beurat" },
    { id: 26, title: "Time To Wake Up", description: "1000ok" },
    { id: 25, title: "Mind over Mind", description: "Ezpace" },
    { id: 24, title: "Infinity", description: "Nimus Dark" },
    { id: 23, title: "Time to Change", description: "Pollux" },
    { id: 22, title: "Psyzzola", description: "Fary" },
    { id: 21, title: "Beacoming", description: "SAV" },
    { id: 20, title: "Stage of Progress", description: "Dexther" },
    { id: 19, title: "Around The World", description: "Anthrax" },
    { id: 18, title: "Disk Jockey’s ", description: "Parallelus & Lucid" },
    { id: 17, title: "Meditation", description: "Gmey" },
    { id: 16, title: "Secret Planet", description: "Revel" },
    { id: 15, title: "Cymatics", description: "Noctum" },
    { id: 14, title: "Life Struggles", description: "Crazy Chronicles & Reverse Mind" },
    { id: 13, title: "Egypt", description: "Another Freak" },
    { id: 12, title: "Heaven in Colors", description: "Psyboks" },
    { id: 11, title: "Reborn", description: "Anthrax" },
    { id: 10, title: "Visions", description: "Villak" },
    { id: 9, title: "Running Into The Riff", description: "Niandra" },
    { id: 8, title: "Rivero", description: "Kobal" },
    { id: 7, title: "Be Hater", description: "Monster Dog" },
    { id: 6, title: "Gayatri", description: "The Last" },
    { id: 5, title: "Middle Eastern", description: "Inviktor" },
    { id: 4, title: "From Heaven", description: "Nax & Lutter" },
    { id: 3, title: "Another Freak", description: "Stranger Sound 303" },
    { id: 2, title: "Deep Voices", description: "Gmey" },
    { id: 1, title: "Sensations", description: "Beurat & Pollux" }
];

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('infinite-cards-container');
    if (!container) return;

    // Split releases into 3 chunks
    const chunkSize = Math.ceil(releases.length / 3);
    const chunks = [];
    for (let i = 0; i < releases.length; i += chunkSize) {
        chunks.push(releases.slice(i, i + chunkSize));
    }

    chunks.forEach((chunk, index) => {
        const scrollerContainer = document.createElement('div');
        scrollerContainer.className = `scroller relative z-20 max-w-7xl mx-auto overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)] mb-8`;

        // Set speed based on row (optional variation)
        const speed = index % 2 === 0 ? '40s' : '50s';
        const direction = 'forwards'; // Right to left (normal scroll)

        scrollerContainer.style.setProperty('--animation-duration', speed);
        scrollerContainer.style.setProperty('--animation-direction', direction);

        const list = document.createElement('ul');
        list.className = 'flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4 animate-scroll hover:[animation-play-state:paused]';

        // Create items
        const createItem = (item) => {
            const li = document.createElement('li');
            // Changed w-[350px] to w-[250px] (slightly narrower since it's vertical now) but taller image
            li.className = 'gallery-item relative w-[280px] max-w-full shrink-0 rounded-2xl border border-white/10 bg-zinc-900/50 p-4 md:w-[320px] overflow-hidden group cursor-pointer hover:border-primary/50 transition-colors duration-300';
            li.setAttribute('data-title', item.title);
            li.setAttribute('data-description', item.description);

            li.innerHTML = `
                <div class="flex flex-col gap-4">
                    <div class="relative w-full aspect-square shrink-0 overflow-hidden rounded-xl">
                        <img src="assets/imgs/release_${item.id}.jpg" alt="${item.title}" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110">
                    </div>
                    <div class="flex flex-col gap-1">
                        <span class="text-lg font-bold text-white font-orbitron group-hover:text-primary transition-colors truncate">${item.title}</span>
                        <span class="text-sm text-gray-400 truncate">${item.description}</span>
                    </div>
                </div>
                <div class="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            `;
            return li;
        };

        // Add items to list
        chunk.forEach(item => {
            list.appendChild(createItem(item));
        });

        // Duplicate items for infinite scroll
        chunk.forEach(item => {
            const clone = createItem(item);
            clone.setAttribute('aria-hidden', 'true');
            list.appendChild(clone);
        });

        scrollerContainer.appendChild(list);
        container.appendChild(scrollerContainer);
    });
});
