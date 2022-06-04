import React from 'react';
import axios from 'axios';

const Register = () => {
    const [error, setError] = React.useState('');

    const apiUrl = 'http://localhost';

    const handleSubmit = (e) => {
        e.preventDefault();
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        let firstname = document.getElementById('firstname').value;
        let lastname = document.getElementById('lastname').value;
        axios.post(`${apiUrl}:8082/api/register`, {
            firstname: firstname,
            lastname: lastname,
            username: username,
            password: password
        })
        .then(res => {
            console.log(res.data);
            if (res.status === 201) {
                console.log("redirecting to home page");
                console.log("window location", window.location);
                window.location = `${apiUrl}:3001/`;
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
            <h1>Register Account</h1>
            <form>
                <label>
                    First Name:
                    <input id="firstname" type="text" name="firstname" />
                </label>
                <label>
                    Last Name:
                    <input id="lastname" type="text" name="lastname" />
                </label>
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
                    Already have an account? <a href="/login">login</a>
                </p>
            </div>

        </div>
    );
}


export default Register;