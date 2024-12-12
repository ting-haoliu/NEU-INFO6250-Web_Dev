const PERMISSIONS = {
	USER: 'user',
	BANNED: 'banned'
};

const activeUsers = {};

function isValid(username) {
	let isValid = true;
	isValid = !!username && username.trim();
	isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
	return isValid;
}

function addUser(username) {
	if (isValid(username)) {
		let permission = PERMISSIONS.USER;

		if (username === 'dog') {
			permission = PERMISSIONS.BANNED;
		}

		activeUsers[username] = {
			username: username,
			permission: permission
		};
	}
}

function getPermissionUser(username) {
	return activeUsers[username]?.permission;
}

function deleteUser(username) {
	delete activeUsers[username];
}


export default {
	isValid,
	addUser,
	deleteUser,
	getPermissionUser,
	activeUsers,
	PERMISSIONS
};