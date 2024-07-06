document.addEventListener('DOMContentLoaded', () => {
  const tiles = document.querySelectorAll('.tile');
  let currentAudio = null;
  let currentTile = null;

  // Store initial positions of tiles
  tiles.forEach(tile => {
    const rect = tile.getBoundingClientRect();
    tile.dataset.initialLeft = rect.left;
    tile.dataset.initialTop = rect.top;
  });

  tiles.forEach((tile) => {
    const audio = tile.querySelector('audio');
    const backContent = tile.querySelector('.tile-back-content');

    tile.addEventListener('click', () => {
      if (currentTile && currentTile !== tile) {
        // Reset previous tile
        currentTile.classList.remove('flipped', 'active');
        setTilePosition(currentTile, currentTile.dataset.initialLeft, currentTile.dataset.initialTop);
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
        centerTile(tile);
        currentTile = tile;
        currentAudio = audio;
      } else {
        // Stop audio
        audio.pause();
        audio.currentTime = 0;
        setTilePosition(tile, tile.dataset.initialLeft, tile.dataset.initialTop);
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

  function centerTile(tile) {
    const rect = tile.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const tileSize = Math.min(viewportWidth, viewportHeight) * 0.6; // 60% of the smaller dimension

    tile.style.width = `${tileSize}px`;
    tile.style.height = `${tileSize}px`;
    tile.style.top = `${(viewportHeight - tileSize) / 2}px`;
    tile.style.left = `${(viewportWidth - tileSize) / 2}px`;
  }

  function setTilePosition(tile, left, top) {
    tile.style.width = '';
    tile.style.height = '';
    tile.style.top = '';
    tile.style.left = '';
    tile.style.transform = '';
  }
});
