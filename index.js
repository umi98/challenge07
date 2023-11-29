require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.port;
const path = require('path');
const routers = require('./router');
const http = require('http').Server(app);
const io = require('./utils/socket')(http);
const flash = require('express-flash');
const session = require('express-session');
const passport = require('./utils/passport');
const morgan = require('morgan');
const Sentry = require('@sentry/node');
const { ProfilingIntegration } = require('@sentry/profiling-node');

app.use(express.json());
app.use(morgan('combined'));
// app.get('/', (req, res) => res.send("Hello world"));

Sentry.init({
  dsn: 'https://c3090f00e910e7731bddbc5f687dbcc4@o4506258328649728.ingest.sentry.io/4506307008528384',
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({ app }),
    new ProfilingIntegration(),
  ],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
});
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
// app.get("/", function rootHandler(req, res) {
//   res.end("Hello world!");
// });
app.use(Sentry.Handlers.errorHandler());
app.use(function onError(err, req, res, next) {
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

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

app.use((req, res, next) => {
    req.io = io;
    return next();
})

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

app.use('/', routers);

http.listen(port, () => console.log(`Listening at http://localhost:${port}`));

// app.use('/', (req, res) => {
//     res.sendFile(__dirname+'/index.html')
// })

module.exports = app