import { useState } from 'react';
import './LoginForm.css';

function LoginForm({ onLogin }) {
    const [username, setUsername] = useState('');

    function onSubmit(e) {
        e.preventDefault();
        if (username) {
            onLogin(username);
        }
    }

    function onInput(e) {
        setUsername(e.target.value);
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <form className="login-form" action="#/login" onSubmit={onSubmit}>
                <label className="login-form__label">
                    <span>Username</span>
                    <input className="login-form__input" value={username} onInput={onInput} />
                </label>
                <button className='login-button' type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginForm;