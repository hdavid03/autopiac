/**
 * Betölti az összes hirdetést az adatbázisból,
 * amelyek a / oldalon jelennek meg.
 */

const requireOption = require('../requireOption');

module.exports = (objectrepository) => {
    const AdModel = requireOption(objectrepository, 'AdModel');
    return (req, res, next) => {
        if(typeof req.query.kereses === 'undefined') {
            return AdModel.find({}, (error, ads) => {
                if (error || typeof ads === 'undefined') {
                    return next(error);
                }
                res.locals.ads = ads;
                return next();
            });
        }
        let pattern = `${req.query.kereses}`;
        return AdModel.find({title: { $regex: new RegExp(pattern), $options: 'i' }}, (error, ads) => {
         if(error || !ads) {
             return next(error);
         }
         res.locals.ads = ads;
         return next();
        });
}
}
