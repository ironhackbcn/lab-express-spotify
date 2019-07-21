'use strict'
function onlyPlayOneIn(container) {
  container.addEventListener("play", function(event) {
   const audioElements = container.getElementsByTagName("audio")
    for( let i=0; i < audioElements.length; i++) {
      const audioElement = audioElements[i];
      if (audioElement !== event.target) {
        audioElement.pause();
      }
    }
  }, true);
}

document.addEventListener("DOMContentLoaded", function() {
  onlyPlayOneIn(document.body);
});