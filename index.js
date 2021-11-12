const express = require('express');
const body_parser = require('body-parser');
//const session = require('express-session');
const app = express();
app.set('view engine', 'ejs');
app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json);
//app.use(
//    session( { secret: 'secret' } )
//);
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
