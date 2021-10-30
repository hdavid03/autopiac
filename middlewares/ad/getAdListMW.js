/**
 * Betölti az összes hirdetést az adatbázisból,
 * amelyek a /ads oldalon jelennek meg.
 */

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};
