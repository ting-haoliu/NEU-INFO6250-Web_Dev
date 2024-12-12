import { useState } from 'react';
import '../styles/LoginForm.css';

function LoginForm({ onLogin }) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	function onChangeUsername(e) {
		setUsername(e.target.value);
	}

	function onChangePassword(e) {
		setPassword(e.target.value);
	}

	function onSubmit(e) {
		e.preventDefault();
		if (username) {
			onLogin(username);
		}
	}

	return (
		<div className="login">
			<form className="login__form" action="#/login" onSubmit={onSubmit}>
				<label>
					<span>Username</span>
					<input className="login__username"
						value={username}
						onChange={onChangeUsername}
					/>
				</label>
				<label>
					<span>Password</span>
					<input
						type="password"
						value={password}
						onInput={onChangePassword}
					/>
				</label>
				<button
					className="login__button"
					type="submit"
				>
					Login
				</button>
			</form>
		</div>
	);
}

export default LoginForm;