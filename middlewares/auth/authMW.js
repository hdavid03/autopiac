/**
 * Ha a felhasználó létezik az adatbázisban, és be is van jelentkezve,
 * akkor hozzáférést nyer az oldal tartalmához.
 * Egyéb más esetben átirányítja a kezdő oldalra (/).
 */

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        if(typeof req.session.iduser === 'undefined') {
            console.log(req.session.iduser);
            return res.redirect('/');
        }
        return next();
    };
};
