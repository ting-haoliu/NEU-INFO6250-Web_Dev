import { state } from "./state";

export function render() {
    const appEL = document.querySelector('#app');

    if (!state.isLoggedIn) {
        appEL.innerHTML = renderLogin();
    } else {
        appEL.innerHTML = renderWord();
    }
}

function renderLogin() {
    return `
        <div class="login-container">
            <h2 class="login-title">Login</h2>
            <form class="login-form">
                <label class="login-form__label">
                    <p class="login-form__label-text">Username:</p>
                    <input class="login-form__input" type="text" name="username" required>
                </label>
                <button id="login-button" type="submit">Login</button>
            </form>
            ${state.loginError ? `<p class="login-error">${state.loginError}</p>` : ''}
        </div>
    `;
}

function renderWord() {
    return `
        <div class="word-container">
            <h2 class="word-title">Hello, ${state.username}</h2>
            <p class="word-content">Your current stored word is: ${state.storedWord}</p>
            <form class="update-form">
                <label class="update-form__label">
                    <span class="update-form__label-text">Update stored word:</span>
                    <input class="update-form__input" type="text" name="newWord" value="${state.storedWord}">
                </label>
                <button id="update-button" type="submit">Update</button>
            </form>
            ${state.updateError ? `<p class="update-error">${state.updateError}</p>` : ''}
            <button id="logout-button">Logout</button>
        </div>
    `;
}