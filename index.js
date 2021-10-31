const express = require('express');
const body_parser = require('body-parser');
const session = require('express-session');
const app = express();

app.set('view engine', 'ejs');
app.use(body_parser.urlencoded());
app.use(body_parser.json);
app.use(express.static('static'));
app.use(
    session( { secret: 'secret' } )
);
// Load routing
require('./route/routing')(app);

app.use((req, res, next) =>
    {
        res.end('There was a problem');
    }
);
const server = app.listen(3000, function () {
console.log('port on: 3000');
});
