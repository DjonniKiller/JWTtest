const { AES } = require('../../crypto/crypto');
const dotenv = require('dotenv');

dotenv.config();

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    { username: 'Евгений Рябко', email: 'jeniaryanko@mail.ru', phone: '+7 959 189 82 86', password: AES.encode("1234", process.env.CRYPTO)},
    { username: 'Жмышенко Валерий', email: 'tvoiabeda@rambler.ru', password: AES.encode("WerWoulf", process.env.CRYPTO)},
    { username: 'Нагиев', email: 'fizfac@yandex.com', password: AES.encode("fizfuck", process.env.CRYPTO)}
  ]);
};
