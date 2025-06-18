// Random profile picture loader
const profilePics = [
    'assets/pfps/pic1.jpg',
    'assets/pfps/pic2.jpg',
    'assets/pfps/pic3.jpg',
    'assets/pfps/pic4.jpeg'
];

function loadRandomPicture() {
    const randomIndex = Math.floor(Math.random() * profilePics.length);
    const profilePic = document.getElementById('profilePic');
    profilePic.src = profilePics[randomIndex];
    
    // Handle image load error - fallback to default
    profilePic.onerror = function() {
        this.src = 'assets/pfps/pic2.jpg';
    };
}

// Initialize on page load
window.addEventListener('load', function() {
    loadRandomPicture();
});

// Load new random picture every 30 seconds
setInterval(loadRandomPicture, 30000);