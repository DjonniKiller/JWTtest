const config = require('../knexfile')['mainConnection'];
const connection = require('knex')(config);

module.exports = { connection }