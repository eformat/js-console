const port = 8081
const express = require('express')
const path = require('path')
const app = express()

const session = require('express-session')
const Keycloak = require('keycloak-connect')
const memoryStore = new session.MemoryStore();
const keycloak = new Keycloak({ store: memoryStore })

app.use(
    express.static(__dirname)
);
app.get('*/', function(req, res) {
    console.log('OK')
    res.sendFile(__dirname + '/index.html');
});
console.log("browse to http://localhost:" + port)
app.listen(port)