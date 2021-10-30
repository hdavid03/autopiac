/**
 * Ellenőrzi, hogy a felhasználó be van-e jelentkezve,
 * és ennek megfelelően tölti be a menüt.
 */

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};
