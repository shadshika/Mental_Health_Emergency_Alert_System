function petPet() {
    // Change pet's position or make it move
    let pet = document.getElementById('pet');
    pet.style.transform = 'translateX(20px)';  // Simulate movement when petted
    setTimeout(() => {
        pet.style.transform = 'translateX(0)';
    }, 500);

    // Send request to Flask backend to log interaction
    fetch('/interact/pet')
        .then(response => response.json())
        .then(data => {
            document.getElementById('feedback').innerHTML = data.feedback;
        });
}

function feedPet() {
    // Change pet's position or make it show an eating action
    let pet = document.getElementById('pet');
    pet.style.transform = 'scale(1.1)';  // Simulate feeding action (enlarging)
    setTimeout(() => {
        pet.style.transform = 'scale(1)';
    }, 500);

    // Send request to Flask backend to log interaction
    fetch('/interact/feed')
        .then(response => response.json())
        .then(data => {
            document.getElementById('feedback').innerHTML = data.feedback;
        });
}
