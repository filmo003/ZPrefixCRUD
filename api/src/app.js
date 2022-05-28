const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const session = require('express-session');
const server = require('http').createServer(app);
const env = process.env.NODE_ENV || 'development';
const config = require('../knexfile')[env];
const knex = require('knex')(config);
const Keycloak = require('keycloak-connect');
const memoryStore = new session.MemoryStore();

app.use(cors());
app.use(express.json());
app.use(session({
    secret: 'keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
}));

const keycloak = new Keycloak({
    store: memoryStore,
});

app.use(keycloak.middleware({
    logout: '/logout',
    admin: '/',
}));

app.get('/', (request, response) => {
    response.status(200).send('App root route running');
});

app.get('/login', keycloak.protect(), (request, response) => {
    response.status(200).send('going to login');
});

module.exports = server;