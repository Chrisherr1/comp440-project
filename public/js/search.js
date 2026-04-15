const searchBtn = document.getElementById('search-btn');
const featureInput = document.getElementById('feature-input');
const errorMessage = document.getElementById('error-message');
const resultsWrapper = document.getElementById('results-wrapper');
const resultsBody = document.getElementById('results-body');
const logoutBtn = document.getElementById('logout-btn');

logoutBtn.addEventListener('click', async () => {
    const response = await fetch('/api/v1/auth/logout', { method: 'POST' });
    if (response.status === 200) {
        window.location.href = '/';
    }
});

searchBtn.addEventListener('click', async () => {
    const featureName = featureInput.value.trim();

    errorMessage.textContent = '';
    resultsWrapper.style.display = 'none';
    resultsBody.innerHTML = '';

    if (!featureName) {
        errorMessage.textContent = 'Please enter a feature to search for.';
        return;
    }

    const response = await fetch(`/api/v1/rental-units/search?feature_name=${encodeURIComponent(featureName)}`);
    const data = await response.json();

    if (response.status !== 200) {
        errorMessage.textContent = data.message;
        return;
    }

    if (data.rentalUnits.length === 0) {
        errorMessage.textContent = 'No rental units found for that feature.';
        return;
    }

    data.rentalUnits.forEach(unit => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${unit.rental_id}</td>
            <td>${unit.title}</td>
            <td>${unit.username}</td>
            <td>${unit.city}</td>
            <td>${unit.state}</td>
            <td>$${unit.price_per_night}</td>
            <td>${unit.description}</td>
            <td><a class="btn-review" href="/write-review?rental_id=${unit.rental_id}">Write Review</a></td>
        `;
        resultsBody.appendChild(tr);
    });

    resultsWrapper.style.display = 'block';
});

featureInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') searchBtn.click();
});
