const SECRET_WORD = "REACT";

function compare(word) {
    const answer = SECRET_WORD.toLowerCase();
    word = word.toLowerCase();

    let matchedCount = 0;
    const matchedLetters = new Set();

    for (let letter of word) {
        if (answer.includes(letter) && !matchedLetters.has(letter)) {
            matchedCount++;
            matchedLetters.add(letter);
        }
    }

    return matchedCount;
}

function isInvalidWord(word) {
    return word.length !== 5 || !word.match(/^[A-Za-z]+$/);
}

function isCorrect(word) {
    return word.toLowerCase() === SECRET_WORD.toLowerCase();
}

export { compare, isInvalidWord, isCorrect };