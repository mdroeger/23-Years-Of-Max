document.addEventListener('DOMContentLoaded', () => {
    const tiles = document.querySelectorAll('.tile');

    tiles.forEach(tile => {
        tile.addEventListener('click', () => {
            const inner = tile.querySelector('.tile-inner');
            const audio = tile.querySelector('audio');

            inner.style.transform = inner.style.transform === 'rotateY(180deg)' ? '' : 'rotateY(180deg)';

            if (audio) {
                audio.play();
            }
        });
    });
});
