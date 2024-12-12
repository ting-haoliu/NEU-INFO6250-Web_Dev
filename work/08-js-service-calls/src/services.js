export const MESSAGES = {
  'network-error': "Server unavailable, pleaser try again",
  'required-username': "The username is only made up of underscore, letters and/or numbers. Please correct!",
  'auth-insufficient': "Bad username, dog is NOT allowed! ",
  'required-word': "Please input a word",
  'invalid-word': "Please input an valid word",
  'auth-missing': 'Authentication missing. Please log in first.',
  default: "Something went wrong, please try again",
}

export function fetchLogin(username) {
  return fetch('/api/session/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ username }),
  })
    .catch(err => Promise.reject({ error: 'network-error' }))
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => Promise.reject(err));
      }
      return response.json();
    });
}

export function fetchLogout() {
  return fetch('/api/session', {
    method: 'DELETE',
  })
    .catch(err => Promise.reject({ error: 'network-error' }))
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => Promise.reject(err));
      }
      return response.json();
    })
}

export function checkSession() {
  return fetch('/api/session')
    .catch(err => Promise.reject({ error: 'network-error' }))
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => Promise.reject(err));
      }
      return response.json();
    });
}

export function getStoredWord() {
  return fetch('/api/word')
    .catch(err => Promise.reject({ error: 'network-error' }))
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => Promise.reject(err));
      }
      return response.json();
    });
}


export function updateStoredWord(word) {
  return fetch('/api/word', {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ word }),
  })
    .catch(err => Promise.reject({ error: 'network-error' }))
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => Promise.reject(err));
      }
      return response.json();
    });
}
