import { useState } from "react";
import { isDog, isInvalid } from "./utils/login";

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    function checkUsername(username) {
        if (isDog(username)) {
            setError('"dog" is not a valid user');
        } else if (isInvalid(username)) {
            setError('The username is not made up of valid characters');
        } else {
            setError('');
            onLogin(username);
        }
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <form
                className="login-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    checkUsername(username);
                }}>
                <label className="login-form__label">
                    <span>Username</span>
                    <input
                        className="login-form__input"
                        value={username}
                        onInput={(e) => setUsername(e.target.value)}
                    />
                </label>
                <button type="submit">Login</button>
                <p className="error-message">{error}</p>
            </form>
        </div>
    );
}

export default Login;