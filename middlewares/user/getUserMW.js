/**
 * Betölti az adott felhasználót az adatbázisból ID alapján.
 */

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const UserModel = requireOption(objectrepository, 'UserModel');
    return function (req, res, next) {

        UserModel.findOne({_id: req.session.iduser}, (error, regUser) => {
            if(error || !regUser) {
                return next(error);
            }

            res.locals.regUser = regUser;
            return next();
        });
    };
};

