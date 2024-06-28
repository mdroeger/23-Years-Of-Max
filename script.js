document.addEventListener('DOMContentLoaded', () => {
    const tiles = document.querySelectorAll('.tile');

    tiles.forEach(tile => {
        tile.addEventListener('click', () => {
            const inner = tile.querySelector('.tile-inner');
            const audio = tile.querySelector('audio');

            if (inner.style.transform === 'rotateY(180deg)') {
                inner.style.transform = '';
                if (audio) {
                    audio.pause();
                    audio.currentTime = 0;
                }
            } else {
                inner.style.transform = 'rotateY(180deg)';
                if (audio) {
                    audio.play();
                }
            }
        });
    });
});
