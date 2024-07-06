document.addEventListener('DOMContentLoaded', () => {
  const tiles = document.querySelectorAll('.tile');
  let currentAudio = null;
  let currentTile = null;

  const lightbox = GLightbox({
    selector: '.glightbox',
    openEffect: 'zoom',
    closeEffect: 'fade',
    onOpen: (target) => {
      // Pause audio and reset currentTile when a new lightbox is opened
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
      if (currentTile) {
        currentTile.classList.remove('flipped', 'active');
        currentTile = null;
      }
    },
    onClose: (target) => {
      const image = target.querySelector('img');
      const tile = Array.from(tiles).find(t => t.querySelector('img').src === image.src);
      
      if (tile) {
        // Flip the tile and play audio
        tile.classList.add('flipped', 'active');
        const audio = tile.querySelector('audio');
        audio.play();
        resizeTextToFit(tile.querySelector('.tile-back-content'));
        currentTile = tile;
        currentAudio = audio;
      }
    }
  });

  tiles.forEach((tile) => {
    const audio = tile.querySelector('audio');
    const backContent = tile.querySelector('.tile-back-content');

    // Add click event for the image link to trigger lightbox
    const imageLink = tile.querySelector('a.glightbox');
    imageLink.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default link behavior
      lightbox.open(); // Open the lightbox
    });

    // Add click event for the entire tile to handle flipping
    tile.addEventListener('click', (event) => {
      // Prevent lightbox trigger if clicking outside the image link
      if (!event.target.closest('a.glightbox')) {
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
