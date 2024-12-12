function generateDataPage(username, storedWord) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>User Data</title>
            <link rel="stylesheet" href="../styles.css">
        </head>
        <body>
            <div class="data">
                <h1 class"data-title">Hello, ${username}!</h1>
                <p class="data-word">Your current stored word is: ${storedWord}</p>
                <form class="update-form" action="/update" method="POST">
                    <label for="newWord">Update stored word:</label>
                    <input type="text" id="newWord" name="newWord" value="${storedWord}">
                    <button class="update-form__button" type="submit">Update</button>
                </form>
                <form class="logout-form" action="/logout" method="POST">
                    <button class="logout-form__button" type="submit">Logout</button>
                </form>
            </div>
        </body>
        </html>
    `;
}

module.exports = { generateDataPage };