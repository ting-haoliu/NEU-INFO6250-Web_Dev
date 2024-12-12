const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

const chats = require('./chats');
const sessions = require('./sessions');
const users = require('./users');

app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.json());

// Sessions
// Check for existing session (used on page load)
app.get('/api/v1/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSession(sid) : '';

    if (!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    res.json({ username })
});

// Create a new session (login)
app.post('/api/v1/session', (req, res) => {
    const { username } = req.body;

    if (!users.isValid(username)) {
        res.status(400).json({ error: 'required-username' });
    }

    if (!users.isAllowed(username)) {
        res.status(403).json({ error: 'auth-insufficient' });
    }

    const sid = sessions.setSession(username);
    users.setUser(username);

    res.cookie('sid', sid);
    res.json({ username });
});

// Logout
app.delete('/api/v1/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSession(sid) : '';

    if (sid) {
        res.clearCookie('sid');
    }

    if (username) {
        sessions.deleteSession(sid); // Delete the session, but not the user data
        users.deleteUser(username);
    }

    res.json({ username });
});


// Chats
// Get Users List
app.get('/api/v1/users', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSession(sid) : '';

    if (!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const usersList = users.getUsers();

    res.json({ username, usersList });
})

// Get Messages List
app.get('/api/v1/messages', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSession(sid) : '';

    if (!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const messagesList = chats.messages;

    res.json({ username, messagesList });
});

// Send a new message
app.post('/api/v1/messages', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSession(sid) : '';

    if (!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const { text } = req.body;

    if (!text) {
        res.status(400).json({ error: 'required-message' });
        return;
    }

    chats.addMessage({ sender: username, text: text });

    res.json({ username, sentMessage: text });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));