const form = document.getElementById('review-form');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');
const logoutBtn = document.getElementById('logout-btn');

// Pre-fill rental_id from query param if coming from search results
const params = new URLSearchParams(window.location.search);
const rentalIdParam = params.get('rental_id');
if (rentalIdParam) {
    document.getElementById('rental-id').value = rentalIdParam;
}

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

    const payload = {
        rental_id: parseInt(document.getElementById('rental-id').value),
        rating: document.getElementById('rating').value,
        comment: document.getElementById('comment').value
    };

    const response = await fetch('/api/v1/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (response.status === 201) {
        successMessage.textContent = 'Review submitted successfully!';
        form.reset();
    } else {
        errorMessage.textContent = data.message;
    }
});
