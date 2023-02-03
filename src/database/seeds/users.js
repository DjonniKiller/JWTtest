const { AES } = require('../../crypto/crypto');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, username: 'Евгений Рябко', email: 'jeniaryanko@mail.ru', phone: '+7 959 189 82 86', password: AES.encode("1234", "n2r5u8x/A?D(G+KaPdSgVkYp3s6v9y$B")},
    {id: 2, username: 'Жмышенко Валерий', email: 'tvoiabeda@rambler.ru', password: AES.encode("WerWoulf", "n2r5u8x/A?D(G+KaPdSgVkYp3s6v9y$B")},
    {id: 3, username: 'Нагиев', email: 'fizfac@yandex.com', password: AES.encode("fizfuck", "n2r5u8x/A?D(G+KaPdSgVkYp3s6v9y$B")}
  ]);
};
