/**
 * Típus: POST
 * Ha létezik a felhasználó, akkor módosítást hajt végre,
 * ha nem létezik akkor egy újat hoz létre és azt hozzá adja az adatbázishoz.
 * siker esetén a /profile oldalra iránytja át.
 *
*/
const requireOption = require('../requireOption');

function saveUserToDataBase(req, res, user, next) {
    if (req.body.passwd === req.body.passwdagain) {
        user.fname = req.body.knev;
        user.lname = req.body.vnev;
        user.city = req.body.lakhely;
        user.email = req.body.email;
        user.phone = req.body.szam;
        user.passwd = req.body.passwd;
        return user.save(error => {
            if (error) {
                return next(error);
            }
            return next();
        });
    } else {
        res.locals.error = 'Nem egyeznek a jelszavak!';
        return next();
    }
}

module.exports = function (objectrepository) {
    const UserModel = requireOption(objectrepository, 'UserModel');
    return function (req, res, next) {
        if(typeof res.locals.regUser === 'undefined') {
            if (
                (typeof req.body.knev === 'undefined') ||
                (typeof req.body.vnev === 'undefined') ||
                (typeof req.body.lakhely === 'undefined') ||
                (typeof req.body.email === 'undefined') ||
                (typeof req.body.passwd === 'undefined') ||
                (typeof req.body.passwdagain === 'undefined')
            ) {
                return res.redirect('/');
            }
            res.locals.user = new UserModel();
            return saveUserToDataBase(req, res, res.locals.user, next);
        } else {
            return saveUserToDataBase(req, res, res.locals.regUser, next);
        }

    }
};
