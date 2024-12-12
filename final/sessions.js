import { v4 as uuid } from 'uuid';

const sessions = {};
const expiredSessions = {};

const MAX_AGE = 60 * 1000 * 5; // 60 seconds * 5 = 5 minutes

function addSession(username) {
	const sid = uuid();
	sessions[sid] = {
		username,
		timestamp: Date.now()
	};
	return sid;
}

function getSessionUser(sid) {
	if (sessions[sid]) {
		if (isSessionValid(sid)) {
			return sessions[sid].username;
		} else {
			// session expired
			expiredSessions[sid] = sid;
			deleteSession(sid);
			return null;
		}
	}
}

function wasExpired(sid) {
	return !!expiredSessions[sid];
}


function deleteSession(sid) {
	delete sessions[sid];
}

function countSessionsByUsername(username) {
	let count = 0;
	for (const sid in sessions) {
		if (sessions[sid]?.username === username) {
			count++;
		}
	}
	return count;
}

function isSessionValid(sid) {
	return (Date.now() - sessions[sid].timestamp) <= MAX_AGE;
}

export default {
	addSession,
	deleteSession,
	getSessionUser,
	countSessionsByUsername,
	wasExpired,
};