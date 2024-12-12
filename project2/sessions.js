const uuid = require('crypto').randomUUID;

const sessions = {};

function setSession(username) {
    const sid = uuid();
    sessions[sid] = {  // Stores session data as an object, allowing more flexibility if more properties are needed.
        username,
    };

    return sid;
}

function getSession(sid) {
    return sessions[sid]?.username;  // avoid errors if sessions[sid] is undefined
}

function deleteSession(sid) {
    delete sessions[sid];
}

module.exports = {
    setSession,
    getSession,
    deleteSession,
};