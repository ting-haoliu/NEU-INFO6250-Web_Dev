function isDog(username) {
    return username.toLowerCase() === 'dog';
}

function isInvalid(username) {
    if (!username || !username.match(/^[A-Za-z0-9_]+$/)) {
        return true;
    }
    return false;
}

export { isDog, isInvalid };