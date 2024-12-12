const words = require('./words');


const games = {}
let originalWords = [...words];

function startNewGame(username) {
    resetGuessList(username);

    let randomIndex = Math.floor(Math.random() * words.length);
    const secretWord = words[randomIndex].toLowerCase();

    games[username] = {
        secretWord: secretWord,
        guessMade: 0,
        words: [...originalWords],
        guessedWords: [],
        isInValid: false,
        isFinished: false,
    };

    console.log(`The user is ${username}, and the secret word is ${secretWord}`);
}

function retrievePastGame(username) {
    const game = games[username];

    if (game) {
        return getGameStatus(username);
    } else {
        startNewGame(username);
    }
}

function resetGuessList(username) {
    if (games[username]) {
        games[username].words = [...originalWords];
    } else {
        games[username] = {
            words: [...originalWords],
        };
    }
}

function makeGuess(username, guess) {
    const game = games[username];

    if (game.isFinished) {
        return;
    }

    if (isValidGuess(username, guess)) {
        game.isInValid = false;

        const guessWord = guess.toLowerCase();
        const matchCount = evaluateMatch(guessWord, game.secretWord);

        game.guessedWords.push({
            word: guessWord,
            matchCount: matchCount
        });
        game.guessMade++;

        removeWordFromList(username, guess);


        if (isCorrectGuess(username, guess)) {
            game.isFinished = true;
        }

    } else {
        game.isInValid = true;
    }
}

function isValidGuess(username, guess) {
    const guessWord = guess.toLowerCase();
    const game = games[username];

    return (game.words.includes(guessWord) && !game.guessedWords.some(g => g.word === guessWord));
}

function isCorrectGuess(username, guess) {
    const game = games[username];
    const guessedWord = guess.toLowerCase();
    const secretWord = game.secretWord.toLowerCase();

    return guessedWord === secretWord;
}

function removeWordFromList(username, guessedWord) {
    const game = games[username];
    const index = words.indexOf(guessedWord);
    if (index !== -1) {
        game.words[index] = "X";
    }
}

function evaluateMatch(guess, secretWord) {
    const guessArray = guess.toUpperCase().split('');
    const wordArray = secretWord.toUpperCase().split('');
    let count = 0;

    guessArray.forEach(letter => {
        const index = wordArray.indexOf(letter);
        if (index !== -1) {
            count++;
            wordArray.splice(index, 1);
        }
    });

    return count;
}

function getGameStatus(username) {
    const game = games[username];

    return {
        isInValid: game.isInValid,
        isFinished: game.isFinished,
        words: game.words,
        guessedWords: game.guessedWords.map(g => ({
            word: g.word,
            matchCount: g.matchCount
        })),
        guessesMade: game.guessMade,
    };
}

module.exports = {
    startNewGame,
    retrievePastGame,
    makeGuess,
    getGameStatus,
}