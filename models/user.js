/**
 * Felhasználó séma.
 * @type {Schema}
 */
const Schema = require('mongoose').Schema;
const db = require('../config/database');
const User = db.model('User', {
    fname: String,
    lname: String,
    email: String,
    passwd: String,
    city: String,
    phone: String
});
module.exports = User;

