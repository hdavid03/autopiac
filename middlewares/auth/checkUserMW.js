/**
 * Ellenőrzi, hogy a felhasználó be van-e jelentkezve,
 * és ennek megfelelően tölti be a menüt.
 */

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        if(typeof req.session.iduser !== 'undefined') {
                return res.redirect('/profil/' + req.session.iduser);
            }
        return next();
        }
    }

