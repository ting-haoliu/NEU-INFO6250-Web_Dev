function generateLoginPage() {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Login</title>
            <link rel="stylesheet" href="../styles.css">
        </head>
        <body>
            <div class="login">
                <h1 class="login-title">Login</h1>
                <form class="login-form" action="/login" method="POST">
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username" required>
                    <button class="login-form__button" type="submit">Login</button>
                </form>
            </div>
        </body>
        </html>
    `;
}

function generateLoginError(errorMessage) {
    return `
        <html>
            <head>
                <title>Login Error</title>
                <link rel="stylesheet" href="/style.css" />
            </head>
            <body>
                <h1>Error: ${errorMessage}</h1>
                <a href="/">Try again</a>
            </body>
        </html>
  `;
}

module.exports = { generateLoginPage, generateLoginError };