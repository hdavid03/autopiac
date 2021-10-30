/**
 * Típus: POST
 * Bejelentkezésnél megnézi, hogy létezik-e az e-mail jelszó páros.
 * Ha nem létezik, hibaüzenet jön, ha igen, akkor átirányítja a /profile oldalra
 */

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};
