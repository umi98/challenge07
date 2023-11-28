require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.port;
const path = require('path');
const routers = require('./router');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const flash = require('express-flash');
const session = require('express-session');
const passport = require('./utils/passport');

app.use(express.json());
// app.get('/', (req, res) => res.send("Hello world"));

app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
}))

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, './app/view'));

app.use('/', routers);

http.listen(port, () => console.log(`Listening at http://localhost:${port}`));

// app.use('/', (req, res) => {
//     res.sendFile(__dirname+'/index.html')
// })

module.exports = app