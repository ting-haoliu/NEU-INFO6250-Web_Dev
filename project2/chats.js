const messages = [];

function addMessage({ sender, text }) {
    const newMessage = {
        sender,
        text,
    };
    messages.push(newMessage);
}

module.exports = {
    messages,
    addMessage,
}