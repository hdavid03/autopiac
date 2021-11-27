/**
 * Betölti az adott hirdetést az ID-je alapján.
 */

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const AdModel = requireOption(objectrepository, 'AdModel');
    const UserModel = requireOption(objectrepository, 'UserModel');
    return function (req, res, next) {
        AdModel.findOne({ _id: req.params.idhirdetes }, (error, ad) => {
           if(error || !ad){
               return next(error);
           }
           res.locals.ad = ad;
            return UserModel.findOne({_id: ad._user}, (error, user) => {
                if(error || !ad){
                    return next(error);
                }
                res.locals.user = user;
                return next();
            });
        });

    };
};
