const form = document.getElementById('post-rental-form');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');
const logoutBtn = document.getElementById('logout-btn');

logoutBtn.addEventListener('click', async () => {
    const response = await fetch('/api/v1/auth/logout', { method: 'POST' });
    if (response.status === 200) {
        window.location.href = '/';
    }
});

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    errorMessage.textContent = '';
    successMessage.textContent = '';

    const featuresRaw = document.getElementById('features').value;
    const features = featuresRaw
        .split(',')
        .map(f => f.trim())
        .filter(f => f.length > 0);

    const payload = {
        title: document.getElementById('title').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        price_per_night: parseFloat(document.getElementById('price_per_night').value),
        description: document.getElementById('description').value,
        features
    };

    const response = await fetch('/api/v1/rental-units', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (response.status === 201) {
        successMessage.textContent = `Rental unit posted successfully! (ID: ${data.rentalId})`;
        form.reset();
    } else {
        errorMessage.textContent = data.message;
    }
});
