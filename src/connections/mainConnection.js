const knex = require('knex');
const connection = require('../knexfile');

module.exports.mainConnection = knex(connection);