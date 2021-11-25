const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/yb4rkw', {useNewUrlParser: true}, (error) => {
    if(error) console.log("Database connection problem");
});

module.exports = mongoose;
