const mongoose = require('mongoose');
const { dbUrl } = require('./../properties');

mongoose.Promise = global.Promise;

mongoose.connect(dbUrl, {
    useMongoClient: true
}).then((connection) => {
    connection.openUri(dbUrl);
}).catch(e => console.log(e));


module.exports = { mongoose };