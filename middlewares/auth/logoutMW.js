/**
 * Kijlentkeztetéshez elpusztítja a session-t amely tartalmazza a felhasználó ID-ját.
 * @type {function(*=, *): *}
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        if(typeof req.session.iduser !== 'undefined') {
            req.session.destroy( error => {
                    return next(error);
            });
        }
        return next();
    };
};