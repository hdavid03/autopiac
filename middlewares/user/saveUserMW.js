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

        if(
            (typeof req.body.knev === 'undefined') ||
            (typeof req.body.vnev === 'undefined') ||
            (typeof req.body.lakhely === 'undefined') ||
            (typeof req.body.email === 'undefined') ||
            (typeof req.body.passwd === 'undefined') ||
            (typeof req.body.passwdagain === 'undefined')
        ) {
            return res.redirect('/');
        }

        if(typeof res.locals.regUser === 'undefined') {
            res.locals.regUser = new UserModel();
            res.locals.regUser.fname = req.body.knev;
            res.locals.regUser.lname = req.body.vnev;
            res.locals.regUser.city = req.body.lakhely;
            res.locals.regUser.email = req.body.email;
            res.locals.regUser.fname = req.body.knev;
            res.locals.regUser.phone = req.body.szam;
            if(req.body.passwd === req.body.passwd) {
                res.locals.regUser.passwd = req.body.passwd;
                res.locals.regUser.save( error => {

                   if(error) {
                       console.log("Itt hiba vagyok");
                       return next(error);
                   }
                   res.session.user
                    return next();
                });

            } else {
                console.log("nem egyforma a jelszó");
                alert('Nem egyforma jelszó');
            }
        }
    };
};
