const express = require('express');
const app = express();
const PORT = 3000;

const chat = require('./chat'); // "chat" holds all the non-web logic for managing users/messages
const chatWeb = require('./chat-web'); // "chat-web" holds the templates for the generated HTML

app.use(express.static('./public'));

app.get('/', (req, res) => {
  res.send(chatWeb.chatPage(chat));
});


// Below includes an example of pulling fields from a POST request body
app.post('/chat', express.urlencoded({ extended: false }), (req, res) => {
  const { username, text } = req.body;
  const sender = username;

  chat.addMessage({ sender, text });
  res.redirect('/'); // Redirect to the home page
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
