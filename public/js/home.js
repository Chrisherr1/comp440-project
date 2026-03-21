const logoutBtn = document.getElementById('logout-btn');

logoutBtn.addEventListener('click', async () => {
    try {
        // Send a POST request to backend logout route
        const response = await fetch('/api/v1/auth/logout', {
            method: 'POST'
        });

        if (response.status === 200) {
            // If successful, send them back to the login page
            window.location.href = '/';
        } else {
            console.error('Failed to log out');
        }
    } catch (error) {
        console.error('Network error during logout:', error);
    }
});