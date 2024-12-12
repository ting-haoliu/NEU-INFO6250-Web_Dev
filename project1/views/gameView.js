const { generateHeader, generateFooter } = require('./commonView');
const gameModel = require('../models/game');

function generateGamePage(username, guessResult) {
    const gameStatus = gameModel.getGameStatus(username);

    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Guess Game</title>
            <link rel="stylesheet" href="../styles.css">
            <link rel="stylesheet" href="../game.css">
        </head>
        <body>
            ${generateHeader()}
            <main class="main">
                <div class="game">
                    <div class="game-title">
                        <h1>Hi, ${username}!</h1>
                        <h2>Guess the secret word</h2>
                    </div>

                    <div class="game-container">
                        <div class="words-list__container">
                            ${getWordsList(username)}
                        </div>

                        <div class="guessed-list__container">
                            <h3>Previous Guesses:</h3>
                            ${getGuessedList(gameStatus.guessedWords)}
                        </div>
                    </div>

                    <div class="guess-container">
                        <form class="guess-form" action="/guess" method="POST">
                            <label for="guess">Enter your guess:</label>
                            <input type="text" id="guess" name="guess" required />
                            <button class="guess-form__button" type="submit">Guess</button>
                        </form>
                        <p class="guess-result">${guessResult}</p>
                    </div>

                    <div class="button-container">
                        <form class="newGame-form" action="/new-game" method="POST">
                            <button class="newGame-form__button" type="submit">New Game</button>
                        </form>

                        <form class="logout-form" action="/logout" method="POST">
                            <button class="logout-form__button" type="submit">Logout</button>
                        </form>
                    </div>
                </div>
            </main>
            ${generateFooter()}
        </body>
        </html>
    `;
}

function getWordsList(username) {
    const gameStatus = gameModel.getGameStatus(username);
    const userWords = gameStatus.words;

    return `
        <h3 class="words-title">Words List:</h3>
        <ul class="words-list">` +
        userWords.map(word => `
            <li class="words-list__items">
                <span>${word}</span>
            </li>
        `).join('') +
        `</ul>`;
}

function getGuessedList(guessedWords) {
    if (guessedWords.length === 0) {
        return '<p>No guess made yet.</p>';
    }

    return `
        <ol class="guess-list">
            ${guessedWords.map(guess => `
            <li class="guess-list__item">
                <span>${guess.word} (Matched: ${guess.matchCount})</span> 
            </li>
            `).join('')}
        </ol>`;
}

module.exports = { generateGamePage }