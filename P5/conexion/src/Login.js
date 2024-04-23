import { useState, useEffect } from 'react';

import LoginForm from './LoginForm';
import LoggedIn from './LoggedIn';

function Login(props) {
    const [user, setUser] = useState(null);

    async function fetchUserHandler() {
        const response = await fetch('http://127.0.0.1:5000/login');
        const data = await response.json();
        setUser(data.user);
    }

    fetchUserHandler();

    return (
        <div>
            {user && <LoggedIn user={user}/>}
            {!user && <LoginForm setUser={setUser}/>}
        </div>
    );
}

export default Login;
