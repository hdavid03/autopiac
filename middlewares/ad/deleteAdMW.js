/**
 * Törli az adott hirdetést az ID-je alapján
 */

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        if(typeof req.params.idhirdetes === 'undefined') {
            return res.redirect('/hirdetes/ajanlataim/' + res.locals.regUser._id);
        }
        return res.locals.ad.remove( {_id: req.params.idhirdetes}, error => {
            if(error) {
                return next(error);
            }
            return res.redirect('/hirdetes/ajanlataim/' + res.locals.regUser._id);
        });
    };
};
