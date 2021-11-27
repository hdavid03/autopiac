/**
 * Új jelszót állít be az adott felhasználóhoz és elmenti az adatbázisban.
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const UserModel = requireOption(objectrepository, 'UserModel');
    return function (req, res, next) {
        if(
            (typeof req.body.email === 'undefined') ||
            (typeof req.body.jelszo === 'undefined')
        ) {
            return res.redirect("/uj_jelszo");
        }
        return UserModel.findOne({email: req.body.email}, (error, user) => {
            if(error) return res.next(error);
            if(user === null) {
                res.locals.error = "Nincs felhasználó ilyen e-mail címmel!";
                return next();
            }
            if(req.body.jelszo !== req.body.jelszoujra) {
                res.locals.error = "A megadott jelszavak nem egyeznek";
                return next();
            }
            res.locals.user = user;
            res.locals.user.passwd = req.body.jelszo;
            res.locals.user.save( saveErr => {
                if(saveErr) return next(saveErr);
                res.locals.success = "Jelszó módosítása sikerült!";
                return next();
            });
        });
    };
};
