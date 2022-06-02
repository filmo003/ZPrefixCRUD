const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const server = require('http').createServer(app);
const env = process.env.NODE_ENV || 'development';
const config = require('../knexfile')[env];
const knex = require('knex')(config);
const { hash, compare } = require('bcrypt');

const saltRounds = 10;

app.use(cors());
app.use(express.json());

app.get('/', (request, response) => {
    response.status(200).send('App root route running');
});

// create a user
app.post("/api/register", (req, res) => {
    // hash password and store
    let { fistName, lastName, username, password } = req.body;
  
    if (!username) res.status(401).send("username required for signup");
    else if (!password) res.status(401).send("password require for signup");
        else {
        hash(password, saltRounds).then((hashedPassword) => {
            console.log(`user's real password:`, password);
            console.log(`That password hashed to:`, hashedPassword);
            knex('users').insert({
                firstName: fistName,
                lastName: lastName,
                usrName: username,
                password: hashedPassword
            })
            .then((data) => {
                res.status(201).json("USER CREATED SUCCESSFULLY")
            })
            .catch((err) => res.status(500).json(err));
        });
        }
    });

app.post("/api/login", (req, res) => {
    // compare password to hashed password
    let { username, password } = req.body;

    if (!username) res.status(401).send("username required for login");
    else if (!password) res.status(401).send("password require for login");
    else {
        knex('users').where({
            usrName: username
        })
        .then((data) => {
            if (data.length === 0) res.status(401).send("username not found");
            else {
                let user = data[0];
                compare(password, user.password).then((isMatch) => {
                    if (isMatch) {
                        res.status(200).json(user);
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