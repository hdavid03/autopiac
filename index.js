const express = require('express');
const body_parser = require('body-parser');
const session = require('express-session');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: true}));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Load routing
require('./route/routing')(app);

app.use(( req, res, next) =>
    {
        res.end('There was a problem');
	console.log("hiba");
    }
);
app.listen(3000, function () {
console.log('port on: 3000');
});
