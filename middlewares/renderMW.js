const requireOption = require('./requireOption');

module.exports = function (objectRepository, viewName) {
    return function (req, res) {
        res.render(viewName, res);
    };

};
