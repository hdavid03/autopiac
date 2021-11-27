/**
 * Típus: POST
 * Ha létezik a felhasználó, akkor módosítást hajt végre,
 * ha nem létezik akkor egy újat hoz létre és azt hozzá adja az adatbázishoz.
 * siker esetén a /profile oldalra iránytja át.
 *
*/
const requireOption = require('../requireOption');

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
        }
        if(req.body.passwd === req.body.passwdagain) {
            res.locals.user.fname = req.body.knev;
            res.locals.user.lname = req.body.vnev;
            res.locals.user.city = req.body.lakhely;
            res.locals.user.email = req.body.email;
            res.locals.user.phone = req.body.szam;
            res.locals.user.passwd = req.body.passwd;
            return res.locals.user.save( error => {
               if(error) {
                   return next(error);
               }
               return next();
            });
        } else {
            res.locals.error = 'Nem egyeznek a jelszavak!';
           return next();
        }
    }
};
