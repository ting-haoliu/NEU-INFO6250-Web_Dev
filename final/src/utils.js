import { LOGIN_STATUS, PERMISSIONS } from './constants';

export function permissionToLoginStatus(permission) {

	if (permission === PERMISSIONS.BANNED) {
		return LOGIN_STATUS.IS_LOGGED_IN_BANNED;
	}
	return LOGIN_STATUS.IS_LOGGED_IN_USER;
}


export function getImageUrl(image) {
	return new URL(`./assets/${image}`, import.meta.url).href;
}