export const SERVER = {
    AUTH_MISSING: 'auth-missing',
    AUTH_INSUFFICIENT: 'auth-insufficient',
    REQUIRED_USERNAME: 'required-username',
    REQUIRED_MESSAGE: 'required-message',
};

export const CLIENT = {
    NETWORK_ERROR: 'networkError',
    NO_SESSION: 'noSession',
};

export const MESSAGES = {
    [CLIENT.NETWORK_ERROR]: 'Trouble connecting to the network.  Please try again',
    [SERVER.AUTH_MISSING]: 'Authentication missing. Please log in first',
    [SERVER.AUTH_INSUFFICIENT]: 'Username "dog" is NOT allowed!',
    [SERVER.REQUIRED_USERNAME]: 'Please enter a valid username',
    [SERVER.REQUIRED_MESSAGE]: 'Please enter the message',
    [CLIENT.NO_SESSION]: 'Session missing. Please log in',
    default: 'Something went wrong.  Please try again',
};