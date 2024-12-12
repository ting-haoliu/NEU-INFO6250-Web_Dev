const user = require('../models/user');
const game = require('../models/game');
const loginView = require('../views/loginView');
const gameView = require('../views/gameView');
const uuidv4 = require('crypto').randomUUID;

function showHomePage(req, res) {
    const sid = req.cookies.sid;
    const session = user.getSession(sid);

    if (!session) {
        res.send(loginView.generateLoginPage(""));
    } else {
        const username = session.username;
        res.send(gameView.generateGamePage(username, ""));
    }
}

function login(req, res) {
    const username = req.body.username;

    if (user.isInvalid(username)) {
        res.status(400).send(loginView.generateLoginPage('*Invalid Username'));
    } else if (user.isNotAllowed(username)) {
        res.status(403).send(loginView.generateLoginPage('*User "dog" is not allowed'));
    }

    const sid = uuidv4();
    user.createSession(sid, username);
    res.cookie('sid', sid);
    game.retrievePastGame(username);
    res.redirect('/');
}

function logout(req, res) {
    const sid = req.cookies.sid;
    user.deleteSession(sid);
    res.clearCookie('sid');
    res.redirect('/');
}

module.exports = {
    showHomePage,
    login,
    logout,
}