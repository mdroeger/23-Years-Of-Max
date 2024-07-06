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
});
