import { useState, useEffect } from 'react';

import './App.css';
import { LOGIN_STATUS, SERVER, CLIENT } from './constants';
import { fetchLogin, fetchLogout, fetchSession, getStoredWord, updateStoredWord } from './services';

import LoginForm from './LoginForm';
import Loading from './Loading';
import Status from './Status';
import Greeting from './Greeting';
import StoredWord from './StoredWord';
import UpdateWordForm from './UpdateWordForm';

function App() {
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');
    const [loginStatus, setLoginStatus] = useState(LOGIN_STATUS.PENDING);
    const [storedWord, setStoredWord] = useState('');
    const [isWordPending, setIsWordPending] = useState(false);

    function onLogin(username) {
        setIsWordPending(true);

        fetchLogin(username)
            .then(response => {
                setError('');
                setUsername(username);
                setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
                setStoredWord(response.storedWord);
                setIsWordPending(false);
            })
            .catch(err => {
                setError(err?.error || 'ERROR');
            });
    }

    function onLogout() {
        setError('');
        setUsername('');
        setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
        setStoredWord('');

        fetchLogout()
            .catch(err => {
                setError(err?.error || 'ERROR');
            });
    }

    function onUpdateWord(word) {
        setIsWordPending(true);

        updateStoredWord(word)
            .then(response => {
                setStoredWord(response.storedWord);
                setIsWordPending(false);
                setError('');
            })
            .catch(err => {
                setIsWordPending(false);
                setError(err?.error || 'ERROR');
            });
    }

    function checkForSession() {
        fetchSession()
            .then(response => {
                setUsername(response.username);
                setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
                return getStoredWord();
            })
            .catch(err => {
                if (err?.error === SERVER.AUTH_MISSING) {
                    return Promise.reject({ error: CLIENT.NO_SESSION })
                }
                return Promise.reject(err);
            })
            .then(response => {
                setStoredWord(response.storedWord);
            })
            .catch(err => {
                if (err?.error === CLIENT.NO_SESSION) {
                    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
                    return;
                }
                setError(err?.error || 'ERROR');
            });
    }

    useEffect(() => {
        checkForSession(); // On page load initially
    }, []);

    return (
        <div className='app'>
            <main className='main'>
                {loginStatus === LOGIN_STATUS.PENDING && <Loading className='login-waiting'>Loading user...</Loading>}
                {loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && <LoginForm onLogin={onLogin} />}
                {loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
                    <>
                        {isWordPending
                            ? <Loading className='word-waiting'>Loading word...</Loading>
                            :
                            <>
                                <Greeting username={username} onLogout={onLogout} />
                                <StoredWord storedWord={storedWord} />
                                <UpdateWordForm onUpdateWord={onUpdateWord} />
                            </>
                        }
                    </>
                )}
                {error && <Status error={error} />}
            </main>
        </div>
    )
}

export default App
