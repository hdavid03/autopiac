/**
 * Hirdetés séma.
 * @type {Schema}
 */
const Schema = require('mongoose').Schema;
const db = require('../config/database');
const Ad = db.model('Ad', {
	title: String,
	brand: String,
	state: String,
	city: String,
	date: String,
	price: Number,
	description: String,
	_user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
});
module.exports = Ad;

