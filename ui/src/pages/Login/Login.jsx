import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [error, setError] = React.useState('');

    const apiUrl = 'http://localhost'
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        axios.post(`${apiUrl}:8082/api/login`, {
            username: username,
            password: password
        }, { withCredentials: true })
        .then(res => {
            console.log(res.status);
            if (res.status === 200) {
                let data = res.data;
                document.cookie = `username=${data.username}`;
                document.cookie = `userId=${data.userId}`;
                console.log("redirecting to home page");
                navigate(`/my-posts`);
            }
            else {
                setError(res.data.message);
            }
        })
        .catch(err => {
            console.log("error with handleSubmit", err);
            setError(err.response.data.message);
            window.alert(err.response.data);
        }
        );
        
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