import { useState } from "react";
import './UpdateWordForm.css';

function UpdateWordForm({ onUpdateWord }) {
    const [word, setWord] = useState('');

    function onSubmit(e) {
        e.preventDefault();
        onUpdateWord(word);
        setWord('');
    }

    function onTyping(e) {
        setWord(e.target.value);
    }

    return (
        <form className="word-form" action="#/update" onSubmit={onSubmit}>
            <input className="update-form__input" value={word} onChange={onTyping} />
            <button className="update-button" type="submit">Update</button>
        </form>
    );
}

export default UpdateWordForm;