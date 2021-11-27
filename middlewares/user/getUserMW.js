/**
 * Betölti az adott felhasználót az adatbázisból ID alapján.
 */

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const UserModel = requireOption(objectrepository, 'UserModel');
    return function (req, res, next) {
        let id = typeof req.params.iduser === 'undefined' ? req.session.iduser : req.params.iduser;
        UserModel.findOne({_id: id}, (error, regUser) => {
            if(error || !regUser) {
                return next(error);
            }
            res.locals.regUser = regUser;
            return next();
        });
    };
};

