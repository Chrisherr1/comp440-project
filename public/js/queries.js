const logoutBtn = document.getElementById('logout-btn');

logoutBtn.addEventListener('click', async () => {
    const response = await fetch('/api/v1/auth/logout', { method: 'POST' });
    if (response.status === 200) {
        window.location.href = '/';
    }
});

// Helper: show error, hide table
function showError(errorEl, wrapperEl, message) {
    errorEl.textContent = message;
    wrapperEl.style.display = 'none';
}

// Helper: clear state before a fetch
function clearSection(errorEl, wrapperEl, bodyEl) {
    errorEl.textContent = '';
    wrapperEl.style.display = 'none';
    bodyEl.innerHTML = '';
}

// Helper: show "no results" message
function noResults(errorEl, wrapperEl) {
    errorEl.textContent = 'No results found.';
    wrapperEl.style.display = 'none';
}

// ── Query 1: Most Expensive Rental Unit per Feature ──
document.getElementById('q1-btn').addEventListener('click', async () => {
    const errorEl = document.getElementById('q1-error');
    const wrapperEl = document.getElementById('q1-wrapper');
    const bodyEl = document.getElementById('q1-body');
    clearSection(errorEl, wrapperEl, bodyEl);

    const response = await fetch('/api/v1/queries/most-expensive-by-feature');
    const data = await response.json();

    if (response.status !== 200) return showError(errorEl, wrapperEl, data.message);
    if (data.results.length === 0) return noResults(errorEl, wrapperEl);

    data.results.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.feature_name}</td>
            <td>${row.title}</td>
            <td>${row.username}</td>
            <td>${row.city}</td>
            <td>${row.state}</td>
            <td>$${row.price_per_night}</td>
        `;
        bodyEl.appendChild(tr);
    });
    wrapperEl.style.display = 'block';
});

// ── Query 2: Users Who Posted Two Units Same Day with Different Features ──
document.getElementById('q2-btn').addEventListener('click', async () => {
    const errorEl = document.getElementById('q2-error');
    const wrapperEl = document.getElementById('q2-wrapper');
    const bodyEl = document.getElementById('q2-body');
    clearSection(errorEl, wrapperEl, bodyEl);

    const featureX = document.getElementById('q2-feature-x').value.trim();
    const featureY = document.getElementById('q2-feature-y').value.trim();

    if (!featureX || !featureY) return showError(errorEl, wrapperEl, 'Please enter both Feature X and Feature Y.');

    const response = await fetch(`/api/v1/queries/two-features-same-day?featureX=${encodeURIComponent(featureX)}&featureY=${encodeURIComponent(featureY)}`);
    const data = await response.json();

    if (response.status !== 200) return showError(errorEl, wrapperEl, data.message);
    if (data.results.length === 0) return noResults(errorEl, wrapperEl);

    data.results.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${row.username}</td>`;
        bodyEl.appendChild(tr);
    });
    wrapperEl.style.display = 'block';
});

// ── Query 3: Rental Units Where All Reviews Are Excellent or Good ──
document.getElementById('q3-btn').addEventListener('click', async () => {
    const errorEl = document.getElementById('q3-error');
    const wrapperEl = document.getElementById('q3-wrapper');
    const bodyEl = document.getElementById('q3-body');
    clearSection(errorEl, wrapperEl, bodyEl);

    const username = document.getElementById('q3-username').value.trim();
    if (!username) return showError(errorEl, wrapperEl, 'Please enter a username.');

    const response = await fetch(`/api/v1/queries/good-reviews?username=${encodeURIComponent(username)}`);
    const data = await response.json();

    if (response.status !== 200) return showError(errorEl, wrapperEl, data.message);
    if (data.results.length === 0) return noResults(errorEl, wrapperEl);

    data.results.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.rental_id}</td>
            <td>${row.title}</td>
            <td>${row.city}</td>
            <td>${row.state}</td>
            <td>$${row.price_per_night}</td>
            <td>${row.description}</td>
        `;
        bodyEl.appendChild(tr);
    });
    wrapperEl.style.display = 'block';
});

// ── Query 4: Users with Most Postings on a Specific Date ──
document.getElementById('q4-btn').addEventListener('click', async () => {
    const errorEl = document.getElementById('q4-error');
    const wrapperEl = document.getElementById('q4-wrapper');
    const bodyEl = document.getElementById('q4-body');
    clearSection(errorEl, wrapperEl, bodyEl);

    const date = document.getElementById('q4-date').value;
    if (!date) return showError(errorEl, wrapperEl, 'Please select a date.');

    const response = await fetch(`/api/v1/queries/most-postings-on-date?date=${encodeURIComponent(date)}`);
    const data = await response.json();

    if (response.status !== 200) return showError(errorEl, wrapperEl, data.message);
    if (data.results.length === 0) return noResults(errorEl, wrapperEl);

    data.results.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.username}</td>
            <td>${row.total}</td>
        `;
        bodyEl.appendChild(tr);
    });
    wrapperEl.style.display = 'block';
});

// ── Query 5: Users Whose Every Review is Poor ──
document.getElementById('q5-btn').addEventListener('click', async () => {
    const errorEl = document.getElementById('q5-error');
    const wrapperEl = document.getElementById('q5-wrapper');
    const bodyEl = document.getElementById('q5-body');
    clearSection(errorEl, wrapperEl, bodyEl);

    const response = await fetch('/api/v1/queries/all-poor-reviews');
    const data = await response.json();

    if (response.status !== 200) return showError(errorEl, wrapperEl, data.message);
    if (data.results.length === 0) return noResults(errorEl, wrapperEl);

    data.results.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${row.username}</td>`;
        bodyEl.appendChild(tr);
    });
    wrapperEl.style.display = 'block';
});

// ── Query 6: Users Whose Rental Units Never Received a Poor Review ──
document.getElementById('q6-btn').addEventListener('click', async () => {
    const errorEl = document.getElementById('q6-error');
    const wrapperEl = document.getElementById('q6-wrapper');
    const bodyEl = document.getElementById('q6-body');
    clearSection(errorEl, wrapperEl, bodyEl);

    const response = await fetch('/api/v1/queries/no-poor-reviews');
    const data = await response.json();

    if (response.status !== 200) return showError(errorEl, wrapperEl, data.message);
    if (data.results.length === 0) return noResults(errorEl, wrapperEl);

    data.results.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${row.username}</td>`;
        bodyEl.appendChild(tr);
    });
    wrapperEl.style.display = 'block';
});
