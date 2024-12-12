import { render } from "./view";
import { state } from "./state";
import { MESSAGES, fetchLogin, fetchLogout, checkSession, getStoredWord, updateStoredWord } from "./services";

function init() {
    checkSession()
        .then(response => {
            state.isLoggedIn = true;
            state.username = response.username;
            return getStoredWord();
        })
        .then(wordResponse => {
            state.storedWord = wordResponse.storedWord;
            state.loginError = '';
        })
        .catch(error => {
            if (error.error === 'auth-missing') {
                state.username = '';
                state.isLoggedIn = false;
                state.storedWord = '';
                state.loginError = '';
            } else {
                state.loginError = MESSAGES[error.error] || MESSAGES.default;
            }
        })
        .finally(() => {
            render();
        });
}

init();

const appEL = document.querySelector('#app');

appEL.addEventListener('click', (event) => {
    if (event.target.id === 'login-button') {
        const username = document.querySelector('.login-form__input').value;

        fetchLogin(username)
            .then(response => {
                state.isLoggedIn = true;
                state.username = response.username;
                state.loginError = '';
                return getStoredWord();
            })
            .then(wordResponse => {
                state.storedWord = wordResponse.storedWord;
            })
            .catch(error => {
                if (error.error === 'required-username' || error.error === 'auth-insufficient') {
                    state.loginError = MESSAGES[error.error];
                } else {
                    state.loginError = MESSAGES[error.error] || MESSAGES.default;
                }
            })
            .finally(() => {
                render();
            });

        event.preventDefault();
    }

    if (event.target.id === 'logout-button') {
        fetchLogout()
            .then(() => {
                state.isLoggedIn = false;
                state.username = '';
                state.storedWord = '';
                state.updateError = '';
            })
            .finally(() => {
                render();
            });
    }

    if (event.target.id === 'update-button') {
        const newWord = document.querySelector('.update-form__input').value;

        updateStoredWord(newWord)
            .then(() => {
                state.storedWord = newWord;
                state.updateError = '';
            })
            .catch(error => {
                if (error.error === 'auth-missing') {
                    state.isLoggedIn = false;
                    state.loginError = MESSAGES[error.error];
                } else if (error.error === 'required-word' || error.error === 'invalid-word') {
                    state.updateError = MESSAGES[error.error];
                } else {
                    state.updateError = MESSAGES[error.error] || MESSAGES.default;
                }
            })
            .finally(() => {
                render();
            });

        event.preventDefault();
    }
});