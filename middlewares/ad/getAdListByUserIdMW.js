/**
 * Az adott felhasználóhoz tartozó hirdetéseket listázza az adatbázisból.
 */

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    return function (req, res, next) {
        const AdModel = requireOption(objectrepository, 'AdModel');
        if(typeof res.locals.regUser === 'undefined') {
            return res.redirect('/');
        }
        AdModel.find( { _user: req.params.iduser }, (error, adsById) => {
            if(error || !adsById) {
                return next(error);
            }
            res.locals.adsById = adsById;
            return next();
        });
    };
};
