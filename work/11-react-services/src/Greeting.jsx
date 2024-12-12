import './Greeting.css';

function Greeting({ username, onLogout }) {
    return (
        <div className="greeting">
            <h2>Hello, {username}</h2>
            <button className="logout-button" onClick={onLogout}>Logout</button>
        </div>
    );
}

export default Greeting;