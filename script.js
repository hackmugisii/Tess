document.addEventListener('DOMContentLoaded', () => {
    const initialScreen = document.getElementById('initial-screen');
    const messageScreen = document.getElementById('message-screen');
    const showMessageButton = document.getElementById('show-message');

    showMessageButton.addEventListener('click', () => {
        // Hide initial screen
        initialScreen.style.display = 'none';
        
        // Show message screen with delay
        setTimeout(() => {
            messageScreen.classList.remove('hidden');
            document.body.style.backgroundColor = '#fff';
        }, 2000);
    });
});
