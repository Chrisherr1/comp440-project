
const form = document.getElementById('signin-form');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Stops the page reload

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Check if passwords match
    if (password !== confirmPassword) {
        errorMessage.textContent = 'Passwords do not match.'
        return;
    }
    // Clear the error message if the passwords match
    errorMessage.textContent = '';

    // 1. Gather data from inputs
    const userData = {
        username: document.getElementById('username').value,
        password: password,
        confirmedPassword: confirmPassword,
        firstName: document.getElementById('fname').value,
        lastName: document.getElementById('lname').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value
    };

    try {
        // 2. Send data to backend
        const response = await fetch('/api/v1/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        // 3. Handle result
        if (response.status === 201) {
            window.location.href = '/'; // Redirect on success
        } else {
            errorMessage.textContent = data.message; // Show backend error
        }
    } catch (error) {
        errorMessage.textContent = 'A network error occurred.';
    }
});
