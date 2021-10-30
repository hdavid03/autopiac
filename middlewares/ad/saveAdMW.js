/**
 * Létrehozza a hirdetést, ha még az nem létezik,
 * egyébként módosítja.
 */

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};
