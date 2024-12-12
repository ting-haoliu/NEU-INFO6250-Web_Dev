import { useState } from "react";
import { compare, isInvalidWord, isCorrect } from "./utils/game";

function Content({ username, onLogout }) {
    const [inputWord, setInputWord] = useState('');
    const [message, setMessage] = useState('');

    function onGuess(inputWord) {
        if (!inputWord) {
            setMessage('Guess word can not be empty');
        } else if (isInvalidWord(inputWord)) {
            setMessage(inputWord + ' was not a valid word');
        } else if (isCorrect(inputWord)) {
            setMessage(inputWord + ' is the secret word!');
        } else {
            let matchedCount = compare(inputWord);
            setMessage(`${inputWord} had ${matchedCount} letters in common`);
        }

        setInputWord(''); //clear after the guess
    }

    return (
        <div className="game">
            <h2>Hello {username}</h2>
            <button onClick={onLogout}>Logout</button>
            <form
                className="game-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    onGuess(inputWord);
                }}>
                <p>Guess the secret word. It contains 5 characters</p>
                <label className="game-form__label">
                    <span>Your Guess:</span>
                    <input
                        className="game-form__label"
                        value={inputWord}
                        onInput={(e) => setInputWord(e.target.value)}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
            {message && <p className="error-message">{message}</p>}
        </div>
    );
}

export default Content;