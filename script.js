document.addEventListener('DOMContentLoaded', () => {
  const tiles = document.querySelectorAll('.tile');
  let currentAudio = null;
  let currentTile = null;

  tiles.forEach((tile) => {
    const audio = tile.querySelector('audio');
    const backContent = tile.querySelector('.tile-back-content');

    tile.addEventListener('click', () => {
      if (currentTile && currentTile !== tile) {
        // Reset previous tile
        currentTile.classList.remove('flipped', 'active');
        if (currentAudio) {
          currentAudio.pause();
          currentAudio.currentTime = 0;
        }
      }

      // Toggle current tile
      tile.classList.toggle('flipped');
      tile.classList.toggle('active');

      if (tile.classList.contains('active')) {
        // Play audio
        audio.play();
        resizeTextToFit(backContent);
        ensureInViewport(tile);
        currentTile = tile;
        currentAudio = audio;
      } else {
        // Stop audio
        audio.pause();
        audio.currentTime = 0;
        currentTile = null;
        currentAudio = null;
      }
    });
  });

  function resizeTextToFit(element) {
    let fontSize = parseInt(window.getComputedStyle(element).fontSize);
    const parent = element.parentElement;
    while (element.scrollHeight > parent.clientHeight || element.scrollWidth > parent.clientWidth) {
      fontSize -= 1;
      element.style.fontSize = `${fontSize}px`;
    }
  }

  function ensureInViewport(tile) {
    const rect = tile.getBoundingClientRect();
    const offset = 10; // Small offset to ensure it stays within bounds
    const left = Math.max(offset, rect.left);
    const top = Math.max(offset, rect.top);
    const right = Math.min(window.innerWidth - rect.width - offset, rect.left);
    const bottom = Math.min(window.innerHeight - rect.height - offset, rect.top);

    tile.style.left = `${left}px`;
    tile.style.top = `${top}px`;
  }
});
