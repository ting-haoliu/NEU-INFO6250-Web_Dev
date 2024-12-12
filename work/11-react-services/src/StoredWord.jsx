function StoredWord({ storedWord }) {
    return (
        <div className="stored-word">
            <p>Your stored word is <strong>{storedWord}</strong></p>
        </div>
    );
}

export default StoredWord;