const express = require('express');
const cookieParser = require('cookie-parser');
const userController = require('./controllers/userController');
const gameController = require('./controllers/gameController');

const app = express();
const PORT = 3000;

// Middleware
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('./public'));

// User Route
app.get('/', userController.showHomePage);
app.post('/login', userController.login);
app.post('/logout', userController.logout);

// Game Route
app.post('/new-game', gameController.showGamePage);
app.post('/guess', gameController.guess);

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));