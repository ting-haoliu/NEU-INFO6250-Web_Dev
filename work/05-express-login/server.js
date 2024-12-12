const express = require('express');
const cookieParser = require('cookie-parser');
const userController = require('./controllers/userController')

const app = express();
const PORT = 3000;

// middleware
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('./public'));

// routes
app.get('/', userController.showHomePage);
app.post('/login', userController.login);
app.post('/logout', userController.logout);
app.post('/update', userController.update);

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));