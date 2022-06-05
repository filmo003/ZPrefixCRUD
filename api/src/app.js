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

app.use(cors(
    {
        origin: 'http://localhost:3001',
        credentials: true
    }
));
app.use(express.json());
app.use(cookieParser());

app.get('/', (request, response) => {
    response
        .status(200)
        .cookie('test', 'johndoe')
        .send('App root route running');
});

// create a user
app.post("/api/register", async (req, res) => {
    // hash password and store
    let { firstname, lastname, username, password } = req.body;

    let usernameTaken = await knex('users').where({ username }).first();

    if (!username) res.status(401).send("Username required for signup");
    else if (!password) res.status(401).send("Password required for signup");
    else if ( usernameTaken) res.status(401).send("Username already exists");
        else {
            hash(password, saltRounds).then((hashedPassword) => {
                console.log(`user's real password:`, password);
                console.log(`That password hashed to:`, hashedPassword);
                knex('users').insert({
                    firstname: firstname,
                    lastname: lastname,
                    username: username,
                    password: hashedPassword
                })
                .returning('id')
                .then((id) => {
                    console.log('data is:', id);
                    res
                        .status(201)
                        .cookie('username', username)
                        .cookie('userId', id)
                        .json("USER CREATED SUCCESSFULLY");
                })
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
                        opt = {
                            domain: 'localhost',
                            path: '/'
                        };
                        res
                            .status(200)
                            .cookie('username', username, opt)
                            .cookie('userId', user.id, opt)
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

app.post('/api/create-post', (req, res) => {
    console.log(`Processing request to create post:`, req.body);
    let { title, content, user_id } = req.body;
    if (!title) res.status(401).send("Title required for post");
    else if (!content) res.status(401).send("Content required for post");
    else if (!user_id) res.status(401).send("Not logged in");
    else {
        knex('post').insert({
            title: title,
            content: content,
            user_id: user_id
        })
        .returning('id')
        .then((id) => {
            res.status(201).json(`Post created with ID: ${id}`);
        })
        .catch((err) => res.status(500).json(err));
    }
});

app.patch('/api/update-post/:id', (req, res) => {
    let { id } = req.params;
    let { title, content } = req.body;
    if (!title) res.status(401).send("Title required for post");
    else if (!content) res.status(401).send("Content required for post");
    else {
        knex('post').where({
            id: id
        })
        .update({
            title: title,
            content: content
        })
        .then((data) => {
            res.status(200).json(`Post updated with ID: ${id}`);
        })
        .catch((err) => res.status(500).json(err));
    }
});

app.delete('/api/delete-post/:id', (req, res) => {
    let { id } = req.params;
    knex('post').where({
        id: id
    })
    .del()
    .then((data) => {
        res.status(200).json(`Post deleted with ID: ${id}`);
    })
    .catch((err) => res.status(500).json(err));
});

app.get('/api/:table_name', (req, res) => {
    console.log(`Processing GET for ${req.params.table_name}`);
    let builder = knex(req.params.table_name);
    
    if (req.query.postId) {
        builder.where({ id: req.query.postId });
    }
    if (req.query.userId) {
        builder.where({ id: req.query.userId });
        }
    if (req.query.username) {
        builder.where({ username: req.query.username });
    }
    if (req.query.title) {
        builder.where({ title: req.query.title });
    }

    builder
    .then(responseData => {
      res.status(200).send(responseData);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

module.exports = server;