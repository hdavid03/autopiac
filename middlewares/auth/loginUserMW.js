/**
 * Típus: POST
 * Bejelentkezésnél megnézi, hogy létezik-e az e-mail jelszó páros.
 * Ha nem létezik, hibaüzenet jön, ha igen, akkor átirányítja a /profile oldalra
 */

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const UserModel = requireOption(objectrepository, 'UserModel');
    return function (req, res, next) {
        if((req.body.email === 'undefined') || (req.body.passwd === 'undefined')) {
            return res.redirect('/belepes');
        }

        UserModel.findOne( {passwd: req.body.passwd, email: req.body.email}, (error, regUser) => {
            if(error) {
                return next(error);
            }
            if(regUser === null){
                return res.redirect('/belepes');
            }
            res.locals.regUser = regUser;
            req.session.iduser = regUser._id;
            return req.session.save( error => {
                if(error) {
                    return next(error);
                }
                return next();
            });
        });
    };
};
