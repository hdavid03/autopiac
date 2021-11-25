/**
 * Betölti az összes hirdetést az adatbázisból,
 * amelyek a / oldalon jelennek meg.
 */

const requireOption = require('../requireOption');

module.exports = (objectrepository) => {
    const AdModel = requireOption(objectrepository, 'AdModel');
    return (req, res, next) => {
        AdModel.find({}, (error, ads) => {
            if(error || typeof ads === 'undefined') {
                return next(error);
            }
            res.locals.ads = ads;
        next();
    });
}
}
