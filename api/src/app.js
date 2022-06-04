const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const server = require('http').createServer(app);
const env = process.env.NODE_ENV || 'development';
const config = require('../knexfile')[env];
const knex = require('knex')(config);
const { hash, compare } = require('bcrypt');
var cookieParser = require('cookie-parser');

const saltRounds = 10;

app.use(cors());
app.use(express.json());

app.get('/', (request, response) => {
    response.status(200).send('App root route running');
});

// create a user
app.post("/api/register", (req, res) => {
    // hash password and store
    let { firstName, lastName, username, password } = req.body;
  
    if (!username) res.status(401).send("Username required for signup");
    else if (!password) res.status(401).send("Password required for signup");
    else if (knex('users').where({ username }).length >= 1) res.status(401).send("Username already exists");
        else {
        hash(password, saltRounds).then((hashedPassword) => {
            console.log(`user's real password:`, password);
            console.log(`That password hashed to:`, hashedPassword);
            knex('users').insert({
                firstname: firstName,
                lastname: lastName,
                username: username,
                password: hashedPassword
            })
            .then((data) => {
                res
                    .status(201)
                    .cookie('username', username, opts)
                    .cookie('userId', data[0], opts)
                    .json("USER CREATED SUCCESSFULLY");
            })
            .catch((err) => res.status(500).json(err));
        });
        }
    });

app.post("/api/login", (req, res) => {
    // compare password to hashed password
    let { username, password } = req.body;

    if (!username) res.status(401).send("Username required for login");
    else if (!password) res.status(401).send("Password required for login");
    else {
        knex('users').where({
            username: username
        })
        .then((data) => {
            if (data.length === 0) res.status(401).send("Username not found");
            else {
                let user = data[0];
                compare(password, user.password).then((isMatch) => {
                    if (isMatch) {
                        let opts = {
                            maxAge: 1000 * 60 * 60 * 24 * 7, // would expire after 7 days
                            httpOnly: true, // The cookie only accessible by the web server
                        }
                        res
                            .status(200)
                            .cookie('username', username, opts)
                            .cookie('userId', user.id, opts)
                            .json("LOGIN SUCCESSFUL");
                    } else {
                        res.status(401).send("incorrect password");
                    }
                });
            }
        })
        .catch((err) => res.status(500).json(err));
    }
});

module.exports = server;