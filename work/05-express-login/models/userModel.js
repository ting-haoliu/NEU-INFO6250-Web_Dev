const sessions = {};

const storedWords = {};

function getStoredWord(username) {
    return storedWords[username] || "";
}

function setStoredWord(username, word) {
    storedWords[username] = word;
}

const data = {
    sessions,
    setStoredWord,
    getStoredWord,
    setStoredWord,
};

module.exports = data;