import { useState } from 'react';


function LoginForm (props) {
    const [enteredUserName, setUserName] = useState('');
    const [enteredPassword, setPassword] = useState('');

    const nameChangeHandler = (event) => {
        setUserName(event.target.value);
    }

    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();

        const userData = {
            name: enteredUserName,
            password: enteredPassword
        }
        login(userData);
        setUserName('');
        setPassword('');
    }

    async function login (userData) {
        const response = await fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type':'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
        if (data.user) {
            props.setUser(data.user);
            alert('Log')
        }
    }

    return (
        <form onSubmit={submitHandler}>
            <div>
                <label>Username: </label>
                <input
                type='text'
                value={enteredUserName}
                onChange={nameChangeHandler}
                />
            </div>
            <div>
                <label>Password: </label>
                <input
                type='password'
                value={enteredPassword}
                onChange={passwordChangeHandler}
                />
            </div>
            <div>
                <button>Log in</button>
            </div>
        </form>
    )
}

export default LoginForm;
