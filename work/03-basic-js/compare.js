"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare(word, guess) {  // DO NOT MODIFY
  word = word.toUpperCase(); //For case insensitive
  guess = guess.toUpperCase();

  let count = 0

  const wordArray = word.split('');
  const guessArray = guess.split('');

  for (let i = 0; i < guess.length; i++) {
    const guessLetter = guessArray[i];

    const index = wordArray.indexOf(guessLetter);

    // If letter found
    if (index !== -1) {
      count++;
      wordArray.splice(index, 1); //remove the letter which have been matched
    }
  }

  return count;
}
