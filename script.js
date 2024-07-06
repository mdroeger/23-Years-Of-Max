document.addEventListener('DOMContentLoaded', () => {
  const tiles = document.querySelectorAll('.tile');
  let currentAudio = null;
  let currentTile = null;

  tiles.forEach(tile => {
    const audio = tile.querySelector('audio');

    tile.addEventListener('click', () => {
      if (currentTile && currentTile !== tile) {
        // Reset previous tile
        currentTile.classList.remove('flipped', 'active');
        if (currentAudio) {
          currentAudio.pause();
          currentAudio.currentTime = 0;
        }
      }

      // Flip the clicked tile
      tile.classList.toggle('flipped');
      tile.classList.toggle('active');

      if (tile.classList.contains('active')) {
        // Play audio
        audio.play();
        // Move tile to the center
        const rect = tile.getBoundingClientRect();
        const docEl = document.documentElement;
        const top = (window.pageYOffset || docEl.scrollTop || document.body.scrollTop) - (docEl.clientTop || 0);
        const left = (window.pageXOffset || docEl.scrollLeft || document.body.scrollLeft) - (docEl.clientLeft || 0);

        tile.style.position = 'absolute';
        tile.style.left = `${left + window.innerWidth / 2 - rect.width / 2}px`;
        tile.style.top = `${top + window.innerHeight / 2 - rect.height / 2}px`;

        currentTile = tile;
        currentAudio = audio;
      } else {
        // Stop audio
        audio.pause();
        audio.currentTime = 0;
        tile.style.position = 'static';
        currentTile = null;
        currentAudio = null;
      }
    });
  });
});
