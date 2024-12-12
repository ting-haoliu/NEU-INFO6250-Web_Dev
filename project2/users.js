const users = [];

function isAllowed(username) {
    return username !== 'dog';
}

function isValid(username) {
    const trimmedUsername = username.trim();
    if (!trimmedUsername || !trimmedUsername.match(/^[a-zA-Z0-9]+$/)) {
        return false;
    }
    return true;
}

function getUsers() {
    return users;
}

function setUser(username) {
    if (isAllowed(username) && isValid(username)) {
        users.push(username);
    }
}

function deleteUser(curUsername) {
    const targetIndex = users.findIndex(username => username === curUsername);
    users.splice(targetIndex, 1);
}

module.exports = {
    isAllowed,
    isValid,
    getUsers,
    setUser,
    deleteUser,
};