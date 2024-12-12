import { login, logout, setError, setMessages, setUsers, addMessage, addUser } from "./state";
import render from "./render";
import { fetchLogin, fetchLogout, fetchAddMessage, fetchUsersList, fetchMessagesList } from "./services";

export function addClickEvents(state, appEl) {
    appEl.addEventListener('click', (e) => {
        switch (e.target.id) {
            case 'logout-button': {
                fetchLogout()
                    .then(() => {
                        logout();
                    })
                    .catch(err => {
                        setError(err?.error || 'ERROR');
                    })
                    .finally(() => {
                        render(state, appEl);
                    });
                break;
            }

            case 'login-button': {
                const username = appEl.querySelector('.login-form__input').value;
                fetchLogin(username)
                    .then(() => {
                        login(username);
                        addUser(username);
                        return Promise.all([fetchUsersList(), fetchMessagesList()]);
                    })
                    .then(([users, messages]) => {
                        setUsers(users.usersList);
                        setMessages(messages.messagesList);
                        setError('');
                    })
                    .catch(err => {
                        setError(err?.error || 'ERROR');
                    })
                    .finally(() => {
                        render(state, appEl);
                    });
                break;
            }

            case 'send-button': {
                const newMessage = document.querySelector('#to-send').value;

                // Ignore empty input
                if (newMessage) {
                    fetchAddMessage(newMessage)
                        .then(() => {
                            addMessage(newMessage);
                        })
                        .catch(err => {
                            setError(err?.error || 'ERROR');
                        })
                        .finally(() => {
                            render(state, appEl);
                        });
                }
                break;
            }
        }

        e.preventDefault();
    });
}
