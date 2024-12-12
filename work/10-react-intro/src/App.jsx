import { useState } from 'react';

import Login from './Login';
import Content from './Content';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  function onLogin(username) {
    setIsLoggedIn(true);
    setUsername(username);
  }

  function onLogout() {
    setIsLoggedIn(false);
  }

  return (
    <div className='app'>
      {
        isLoggedIn
          ? <Content
            username={username}
            onLogout={onLogout}
          />
          : <Login
            onLogin={onLogin}
          />
      }
    </div>
  );
}

export default App
