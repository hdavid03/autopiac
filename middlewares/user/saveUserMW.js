/**
 * Típus: POST
 * Ha létezik a felhasználó, akkor módosítást hajt végre,
 * ha nem létezik akkor egy újat hoz létre és azt hozzá adja az adatbázishoz.
 * siker esetén a /profile oldalra iránytja át.
 *
*/
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};
