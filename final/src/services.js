export function fetchCheckSession() {
    return fetch('/api/session', {
        method: 'GET',
    })
        .catch(() => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        });
}

export function fetchLogin(username) {
    return fetch('/api/session', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ username }),
    })
        .catch(() => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        });
}

export function fetchLogout() {
    return fetch('api/session', {
        method: 'DELETE'
    })
        .catch(() => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        });
}

export function fetchProducts() {
    return fetch('/api/products', {
        method: 'GET',
    })
        .catch(() => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        });
}

export function fetchCart() {
    return fetch('/api/carts', {
        method: 'GET',
    })
        .catch(() => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        });
}

export function fetchAddItem(id, quantity) {
    return fetch(`/api/carts/${id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
    })
        .catch(() => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        });
}

// Change an item's quantity in the cart for user
export function fetchSetItemQuantity(id, quantity) {
    return fetch(`/api/carts/${id}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
    })
        .catch(() => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        });
}

export function fetchDeleteItem(id) {
    return fetch(`/api/carts/${id}`, {
        method: 'DELETE',
    })
        .catch(() => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        });
}

// Make an order for the user
export function fetchMakeOrder() {
    return fetch('/api/orders', {
        method: 'POST',
    })
        .catch(() => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        });
}