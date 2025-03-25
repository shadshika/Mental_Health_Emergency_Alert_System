// Select all meditation buttons
document.querySelectorAll('.track-button').forEach(button => {
    button.addEventListener('click', function() {
        const trackUrl = this.getAttribute('data-audio');
        playTrack(trackUrl, this);
    });
});

// Play track function
function playTrack(trackUrl, button) {
    const audioPlayer = document.getElementById("audio-player");
    const audioSource = document.getElementById("audio-source");

    audioSource.src = trackUrl;
    audioPlayer.load();
    audioPlayer.play();

    // Highlight active button
    document.querySelectorAll('.track-button').forEach(btn => btn.style.backgroundColor = "#00796b");
    button.style.backgroundColor = "#004d40";
}
