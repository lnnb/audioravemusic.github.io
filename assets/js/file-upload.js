document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-upload');
    const fileList = document.getElementById('file-list');
    const emptyState = document.getElementById('empty-state');
    const gridPattern = document.getElementById('grid-pattern');

    // Generate Grid Pattern
    const columns = 41;
    const rows = 11;
    for (let i = 0; i < rows * columns; i++) {
        const div = document.createElement('div');
        div.className = `w-10 h-10 flex shrink-0 rounded-[2px] ${i % 2 === 0
                ? "bg-zinc-800/30"
                : "bg-zinc-800/30 shadow-[0px_0px_1px_3px_rgba(0,0,0,0.2)_inset]"
            }`;
        gridPattern.appendChild(div);
    }

    // Handle Click
    dropZone.addEventListener('click', (e) => {
        // Prevent triggering if clicking on a file item (optional, but good UX)
        fileInput.click();
    });

    fileInput.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent bubbling back to dropZone
    });

    // Handle File Selection
    fileInput.addEventListener('change', (e) => {
        handleFiles(Array.from(e.target.files));
    });

    // Handle Drag & Drop
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('border-primary', 'bg-zinc-800');
    });

    dropZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        dropZone.classList.remove('border-primary', 'bg-zinc-800');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('border-primary', 'bg-zinc-800');
        if (e.dataTransfer.files.length > 0) {
            handleFiles(Array.from(e.dataTransfer.files));
        }
    });

    function handleFiles(files) {
        if (files.length > 0) {
            emptyState.style.display = 'none';
        }

        files.forEach(file => {
            const fileItem = document.createElement('div');
            fileItem.className = 'relative overflow-hidden z-40 bg-white dark:bg-zinc-800 flex flex-col items-start justify-start md:h-24 p-4 w-full mx-auto rounded-md shadow-sm animate__animated animate__fadeInUp';

            fileItem.innerHTML = `
                <div class="flex justify-between w-full items-center gap-4">
                    <p class="text-base text-neutral-700 dark:text-neutral-300 truncate max-w-xs font-medium">
                        ${file.name}
                    </p>
                    <p class="rounded-lg px-2 py-1 w-fit shrink-0 text-sm text-neutral-600 dark:bg-zinc-900 dark:text-white shadow-input">
                        ${(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                </div>
                <div class="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-neutral-600 dark:text-neutral-400">
                    <p class="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-zinc-900">
                        ${file.type || 'Unknown Type'}
                    </p>
                    <p>
                        modified ${new Date(file.lastModified).toLocaleDateString()}
                    </p>
                </div>
            `;

            // Stop propagation on file item click to prevent opening file dialog again
            fileItem.addEventListener('click', (e) => {
                e.stopPropagation();
            });

            fileList.appendChild(fileItem);
        });
    }
});
