// Select all sound boxes
const soundBoxes = document.querySelectorAll('.sound-box');
let currentAudio = null;

// Loop through each sound box
soundBoxes.forEach((box) => {
    const soundFile = box.getAttribute('data-sound');
    const audio = new Audio(soundFile);

    // Get the play/pause button
    const playPauseButton = box.querySelector('button');

    // Play/Pause button event
    playPauseButton.addEventListener('click', () => {
        if (currentAudio && currentAudio !== audio) {
            currentAudio.pause();
            playPauseButton.textContent = "▶ Play";
        }
        
        if (audio.paused) {
            audio.play();
            playPauseButton.textContent = "⏸ Pause";
            currentAudio = audio;
        } else {
            audio.pause();
            playPauseButton.textContent = "▶ Play";
        }
    });
});
