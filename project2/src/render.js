function render(state, appEl) {
    const html = `
        ${generateLoginHtml(state)}
        ${generateContentHtml(state)}
    `;
    appEl.innerHTML = html;
}

function generateLoginHtml(state) {
    if (state.isLoggedIn) {
        return ``;
    }

    return `
        <div class="login-container">
            <h2 class="login-title">Login</h2>
            <form class="login-form" action="#login">
                <label class="login-form__label">
                    <p class="login-form__label-text">Username</p>
                    <input class="login-form__input" type="text">
                </label>
                <button id="login-button" type="submit">Login</button>
            </form>
            ${generateStatusHtml(state)}
        </div>
    `;
}

function generateContentHtml(state) {
    if (!state.isLoggedIn) {
        return ``;
    }

    return `
        <div class="content-container">
            ${generateGreetingHtml(state)}
            ${getUsersHTML(state)}
            ${getMessagesHTML(state)}
            ${getOutgoingHTML()}
        </div>
    `;
}

function getUsersHTML(state) {
    return `
        <ul class="users">` +
        Object.values(state.usersList).map(user => `
            <li>
                <div class="user">
                    <span class="username">${user}</span>
                </div>
            </li>    
        `).join('') +
        `</ul>`;
}

function getMessagesHTML(state) {
    return `
        <ol class="messages">` +
        Object.values(state.messagesList).map(message => `
            <li>
                <div class="message">
                    <div class="sender-info">
                        <img class="user-image" alt="avatar of ${message.sender}" src="//placehold.co/40x40?text=${message.sender}"/>
                    </div>
                    <p class="message-text">${message.text}</p>
                </div>
            </li>
        `).join('') +
        `</ol>`;
}

function getOutgoingHTML() {
    return `
        <div class="outgoing">
            <form class="message-form">
                <textarea id="to-send" name="text" placeholder="Enter text to send"/></textarea>
                <button id="send-button" type="submit">Send</button>
            </form>
        </div>
    `;
}

function generateGreetingHtml(state) {
    return `
        <div class="greeting-container">
            <p>Hello, ${state.username}</p>
            <button id="logout-button">Logout</button>
        </div>
    `;
}

function generateStatusHtml(state) {
    return `
        <div class="error-message"> ${state.error}</>
    `;
}

export default render;