document.addEventListener('DOMContentLoaded', function () {
    const tiles = document.querySelectorAll('.tile');
    let currentAudio = null;
    let currentTile = null;

    tiles.forEach(tile => {
        tile.addEventListener('click', function () {
            const audio = this.querySelector('audio');

            if (currentTile && currentTile !== this) {
                currentTile.classList.remove('flipped');
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }

            if (currentTile === this) {
                currentTile.classList.remove('flipped');
                currentAudio.pause();
                currentAudio.currentTime = 0;
                currentTile = null;
                currentAudio = null;
            } else {
                this.classList.add('flipped');
                audio.play();
                currentTile = this;
                currentAudio = audio;
            }
        });
    });
});
