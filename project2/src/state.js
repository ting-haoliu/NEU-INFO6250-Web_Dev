import { MESSAGES } from "./constants"

const state = {
    isLoggedIn: false,
    username: '',
    usersList: [],
    messagesList: [],
    error: '',
    isLoading: true,
}

export function login(username) {
    state.isLoggedIn = true;
    state.username = username;
    state.error = '';
    state.isLoading = false;
}

export function logout() {
    state.isLoggedIn = false;
    state.username = '';
    state.usersList = [];
    state.messagesList = [];
    state.error = '';
    state.isLoading = false;
}

export function setError(error) {
    if (!error) {
        state.error = '';
        return;
    }
    state.error = MESSAGES[error] || MESSAGES.default;
}

export function setUsers(usersList) {
    usersList.forEach((user) => {
        if (!state.usersList.includes(user)) {
            state.usersList.push(user);
        }
    });
    state.error = '';
}

export function addUser(username) {
    if (!state.usersList.includes(username)) {
        state.usersList.push(username);
        state.error = '';
    }
}

export function setMessages(messagesList) {
    state.messagesList = messagesList;
    state.error = '';
}

export function addMessage(messageText) {
    state.messagesList.push({
        sender: state.username,
        text: messageText
    });
    state.error = '';
}

export default state;