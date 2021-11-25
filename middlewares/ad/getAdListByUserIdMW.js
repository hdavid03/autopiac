/**
 * Az adott felhasználóhoz tartozó hirdetéseket listázza az adatbázisból.
 */

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    return function (req, res, next) {
        const AdModel = requireOption(objectrepository, 'AdModel');
        if(res.locals.regUser === 'undefined') {
            return res.redirect('/');
        }
        AdModel.find({_user: res.locals.regUser._id}, (error, adsById) => {
            if(error || !adsById) {
                return next(error);
            }
            console.log("Sikeres lekérdezés.");
            res.locals.adsById = adsById;
            return next();
        });
    };
};
