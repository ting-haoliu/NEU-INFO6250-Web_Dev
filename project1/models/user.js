const sessions = {};

function createSession(sid, username) {
    sessions[sid] = { username };
}

function getSession(sid) {
    return sessions[sid];
}

function deleteSession(sid) {
    delete sessions[sid];
}

function isInvalid(username) {
    return !username || !username.match(/^[a-zA-Z0-9]+$/);
}

function isNotAllowed(username) {
    return username.toLowerCase() === 'dog';
}

const user = {
    sessions,
    createSession,
    getSession,
    deleteSession,
    isInvalid,
    isNotAllowed,
}

module.exports = user;
