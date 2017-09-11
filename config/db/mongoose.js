const mongoose = require('mongoose');
const { dbUrl } = require('./../properties');

mongoose.Promise = global.Promise;
mongoose.connect(dbUrl);

module.exports = { mongoose };