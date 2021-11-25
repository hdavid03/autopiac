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
            console.log("Itt van ez nem jó");
            return res.redirect('/belepes');
        }

        UserModel.findOne( {passwd: req.body.passwd, email: req.body.email}, (error, regUser) => {
            if(error || !regUser) {
                console.log('Itt van most');
                return next(error);
            }
            res.locals.regUser = regUser;
            console.log("Bejelentkezés sikeres!!!!!!");
            console.log(regUser.passwd + regUser.email);
            req.session.iduser = regUser._id;
            return req.session.save( error => {
                console.log('Save session');
                if(error) {
                    return next(error);
                }
                return next();
            });
        });
    };
};
