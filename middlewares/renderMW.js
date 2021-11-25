const requireOption = require('./requireOption');

module.exports = (objectRepository, viewName) => {
    return (req, res) => {
        res.render(viewName, res.locals);
    };

};
