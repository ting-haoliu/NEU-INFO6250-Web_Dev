const { generateHeader, generateFooter } = require('./commonView');

function generateLoginPage(errorMessage) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Login</title>
            <link rel="stylesheet" href="../styles.css">
            <link rel="stylesheet" href="../login.css">
        </head>
        <body>
            ${generateHeader()}
            <main class="main">
                <div class="login">
                    <h1 class="login-title">Login</h1>
                    <form class="login-form" action="/login" method="POST">
                        <label for="username">Username:</label>
                        <input type="text" id="username" name="username" required>
                        <p class="login-form__error">${errorMessage}</p>
                        <button class="login-form__button" type="submit">Login</button>
                    </form>
                </div>
            </main>
            ${generateFooter()}
        </body>
        </html>
    `;
}

module.exports = { generateLoginPage }