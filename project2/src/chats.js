import state, { login, logout, setError, setUsers, setMessages } from "./state";
import render from "./render";
import { addClickEvents } from "./listeners";
import { fetchSession, fetchMessagesList, fetchUsersList } from "./services";
import { SERVER, CLIENT } from "./constants";

const appEl = document.querySelector('#app');
render(state, appEl);
addClickEvents(state, appEl);
init();
pollChanges();

function init() {
    fetchSession()
        .then(response => {
            if (response.username) {
                login(response.username);
                return Promise.all([fetchUsersList(), fetchMessagesList()]);
            }
        })
        .then(([users, messages]) => {
            setUsers(users.usersList);
            setMessages(messages.messagesList);
            setError('');
        })
        .catch(err => {
            if (err?.error === SERVER.AUTH_MISSING) {
                return Promise.reject({ error: CLIENT.NO_SESSION })
            }
            return Promise.reject(err);
        })
        .catch(err => {
            if (err?.error === CLIENT.NO_SESSION) {
                logout();
                return;
            }
            setError(err?.error || 'ERROR');
        })
        .finally(() => {
            render(state, appEl);
        });
}

function refreshMessagesList() {
    return fetchMessagesList()
        .then(response => {
            if (!state.messages || state.messages.length < response.length) {
                setMessages(response.messagesList);
                return 'update';
            }
        })
        .catch(err => {
            if (err?.error === SERVER.AUTH_MISSING) {
                logout();
            } else {
                setError(err?.error || 'ERROR');
            }
        });
}

function refreshUsersList() {
    return fetchUsersList()
        .then(response => {
            if (!state.users || JSON.stringify(state.users) !== JSON.stringify(response)) {
                setUsers(response.usersList);
                return 'update';
            }
        })
        .catch(err => {
            if (err?.error === SERVER.AUTH_MISSING) {
                logout();
            } else {
                setError(err?.error || 'ERROR');
            }
        });
}

// Polling functions
function renderMessagesList() {
    refreshMessagesList()
        .then(response => {
            if (response === 'update') {
                render(state, appEl);
            }
        })
        .catch(() => render(state, appEl)); // Ignore error as it's handled in refreshMessagesList
}

function renderUsersList() {
    refreshUsersList()
        .then(response => {
            if (response === 'update') {
                render(state, appEl);
            }
        })
        .catch(() => render(state, appEl)); // Ignore error as it's handled in refreshUsersList
}

function pollChanges() {
    if (state.username) {
        renderMessagesList();
        renderUsersList();
    }
    setTimeout(pollChanges, 5000); // Poll every 5 seconds
}