/**
 * Létrehozza a hirdetést, ha még az nem létezik,
 * egyébként módosítja.
 */

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const AdModel = requireOption(objectrepository, 'AdModel');
    return function (req, res, next) {
        if(
            (typeof req.body.cim === 'undefined') ||
            (typeof req.body.marka === 'undefined') ||
            (typeof req.body.allapot === 'undefined') ||
            (typeof req.body.ar === 'undefined')
        ) {
            return res.redirect('/');
        }
            let date = new Date();
        if(typeof res.locals.ad === 'undefined') {
            res.locals.ad = new AdModel();
            res.locals.ad.date = date.toLocaleDateString();
        }
            res.locals.ad.title = req.body.cim;
            res.locals.ad.brand = req.body.marka;
            res.locals.ad.state = req.body.allapot;
            res.locals.ad.price = parseInt(req.body.ar);
            res.locals.ad.city = res.locals.regUser.city;
            res.locals.ad.description = req.body.leiras === 'undefined' ? '' : req.body.leiras;
            res.locals.ad._user = res.locals.regUser._id;
            res.locals.ad.save( error => {
                if(error) {
                    return next(error);
                }
                return next();
            });
    };
};
