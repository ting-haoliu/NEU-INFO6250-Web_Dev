const userModel = require('../models/user');
const gameModel = require('../models/game');
const loginView = require('../views/loginView');
const gameView = require('../views/gameView');

function showGamePage(req, res) {
    const sid = req.cookies.sid;
    const session = userModel.getSession(sid);

    if (session) {
        const username = session.username;

        gameModel.startNewGame(username);
        res.redirect('/');
    } else {
        res.status(400).send(loginView.generateLoginPage('*Invalid session. Please log in again.'));
    }
}

function guess(req, res) {
    const sid = req.cookies.sid;
    const session = userModel.getSession(sid);

    if (!session) {
        return res.status(401).send(loginView.generateLoginPage('*Invalid session. Please log in again.'));
    }

    const username = session.username;
    const guess = req.body.guess;

    gameModel.makeGuess(username, guess);

    const gameStatus = gameModel.getGameStatus(username);

    let guessResult = "";
    if (gameStatus.isInValid) {
        guessResult = `Your guess of "${guess}" was invalid`;
    } else {
        if (gameStatus.isFinished) {
            guessResult = "You are correct! Let's start a new game";
        } else {
            guessResult = `Your guess of "${guess}" was incorrect`;
        }
    }

    res.send(gameView.generateGamePage(username, guessResult));
}

module.exports = {
    showGamePage,
    guess
}