document.addEventListener('DOMContentLoaded', () => {
    const tiles = document.querySelectorAll('.tile');
    let activeTile = null;

    tiles.forEach(tile => {
        tile.addEventListener('click', () => {
            const inner = tile.querySelector('.tile-inner');
            const audio = tile.querySelector('audio');

            // If there's an active tile, reset it
            if (activeTile && activeTile !== tile) {
                const activeInner = activeTile.querySelector('.tile-inner');
                const activeAudio = activeTile.querySelector('audio');
                activeInner.style.transform = '';
                if (activeAudio) {
                    activeAudio.pause();
                    activeAudio.currentTime = 0;
                }
            }

            // Toggle the current tile
            if (inner.style.transform === 'rotateY(180deg)') {
                inner.style.transform = '';
                if (audio) {
                    audio.pause();
                    audio.currentTime = 0;
                }
                activeTile = null;
            } else {
                inner.style.transform = 'rotateY(180deg)';
                if (audio) {
                    audio.play();
                }
                activeTile = tile;
            }
        });
    });
});
