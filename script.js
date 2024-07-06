document.addEventListener('DOMContentLoaded', () => {
  const tiles = document.querySelectorAll('.tile');
  let currentAudio = null;
  let currentTile = null;

  tiles.forEach(tile => {
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
        // Restore previous tile position
        currentTile.style.transform = currentTile.originalTransform;
        currentTile.style.position = 'static';
        currentTile.placeholder.classList.remove('placeholder');
      }

      // Flip the clicked tile
      tile.classList.toggle('flipped');
      tile.classList.toggle('active');

      if (tile.classList.contains('active')) {
        // Save original transform
        tile.originalTransform = tile.style.transform;

        // Create a placeholder
        tile.placeholder = document.createElement('div');
        tile.placeholder.className = 'tile placeholder';
        tile.placeholder.style.width = `${tile.offsetWidth}px`;
        tile.placeholder.style.height = `${tile.offsetHeight}px`;
        tile.parentNode.insertBefore(tile.placeholder, tile);

        // Play audio
        audio.play();
        
        // Calculate center position
        const rect = tile.getBoundingClientRect();
        const docEl = document.documentElement;
        const scrollTop = window.pageYOffset || docEl.scrollTop || document.body.scrollTop;
        const scrollLeft = window.pageXOffset || docEl.scrollLeft || document.body.scrollLeft;
        const top = scrollTop + window.innerHeight / 2 - rect.height / 2;
        const left = scrollLeft + window.innerWidth / 2 - rect.width / 2;

        // Move tile to the center
        tile.style.position = 'fixed';
        tile.style.top = `${rect.top}px`;
        tile.style.left = `${rect.left}px`;

        requestAnimationFrame(() => {
          tile.style.transition = 'transform 0.6s, top 0.6s, left 0.6s';
          tile.style.top = `${top}px`;
          tile.style.left = `${left}px`;
          tile.style.transform = `scale(1.5)`;
        });

        resizeTextToFit(backContent);

        currentTile = tile;
        currentAudio = audio;
      } else {
        // Stop audio
        audio.pause();
        audio.currentTime = 0;

        // Restore tile position
        tile.style.position = 'static';
        tile.style.transform = tile.originalTransform;
        currentTile = null;
        currentAudio = null;

        // Remove placeholder
        if (tile.placeholder) {
          tile.placeholder.remove();
        }
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
