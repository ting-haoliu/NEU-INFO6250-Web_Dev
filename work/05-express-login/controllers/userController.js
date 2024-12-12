const userModel = require('../models/userModel');
const loginView = require('../views/loginView');
const dataView = require('../views/dataView');

const uuidv4 = require('crypto').randomUUID;

function showHomePage(req, res) {
    const sid = req.cookies.sid;
    const session = userModel.sessions[sid];

    if (!session) {
        res.send(loginView.generateLoginPage());
    } else {
        const user = session.username;
        const storedWord = userModel.getStoredWord(user);

        res.send(dataView.generateDataPage(user, storedWord));
    }
}

function login(req, res) {
    const username = req.body.username.trim();
    if (!username || !username.match(/^[a-zA-Z0-9]+$/)) {
        res.status(400).send(loginView.generateLoginError('Invalid username'));
        return;
    } else if (username === 'dog') {
        res.status(403).send(loginView.generateLoginError('User "dog" is not allowed'));
        return;
    } else {
        const sid = uuidv4();
        userModel.sessions[sid] = { username };
        res.cookie('sid', sid);
        res.redirect('/');
    }
}

function logout(req, res) {
    const sid = req.cookies.sid;
    delete userModel.sessions[sid];
    res.clearCookie('sid');
    res.redirect('/');
}

function update(req, res) {
    const sid = req.cookies.sid;
    const session = userModel.sessions[sid];

    if (session) {
        const newWord = req.body.newWord;
        userModel.setStoredWord(session.username, newWord);
        res.redirect('/');
    } else {
        res.send(loginView.generateLoginPage());
    }
}

module.exports = {
    showHomePage,
    login,
    logout,
    update,
}