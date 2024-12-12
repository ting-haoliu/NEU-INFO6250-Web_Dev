function generateHeader() {
    return `
        <header class="header">
            <h1 class="header-title">Guess Game</h1>
        </header>
    `;
}

function generateFooter() {
    return `
        <footer class="footer">
            <p class="footer-content">Copyright © 2024 Tinghao Liu</p>
        </footer>
    `;
}

module.exports = {
    generateHeader,
    generateFooter,
}