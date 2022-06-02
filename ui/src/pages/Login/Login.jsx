import React from 'react';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

    const apiUrl = window.location.origin;

    const handleSubmit = (e) => {
        e.preventDefault();
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        axios.post(`${apiUrl}:8082/api/login`, {
            username,
            password
        })
        .then(res => {
            console.log(res);
            console.log(res.data);
            if (res.data.success) {
                window.location.href = window.location.origin;
            }
            else {
                setError(res.data.message);
            }
        })
        .catch(err => {
            console.log("error with handleSubmit", err);
            setError(err.response.data.message);
            window.alert(err.response.data);
        });
    };
    return (
        <div>
            <h1>Login</h1>
            <form>
                <label>
                    Username:
                    <input id="username" type="text" name="username" />
                </label>
                <label>
                    Password:
                    <input id="password" type="password" name="password" />
                </label>
                <input type="submit" value="Submit" onClick={handleSubmit} />
            </form>
            <div>
                <p>
                    Don't have an account? <a href="/register">Register Here</a>
                </p>
            </div>

        </div>
    );
}

export default Login;