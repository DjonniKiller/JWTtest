const { AES } = require('../../crypto/crypto');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, email: 'jeniaryanko@mail.ru', password: AES.encode("z123321z", "n2r5u8x/A?D(G+KaPdSgVkYp3s6v9y$B")},
    {id: 2, email: 'tvoiabeda@rambler.ru', password: AES.encode("WerWoulf", "n2r5u8x/A?D(G+KaPdSgVkYp3s6v9y$B")},
    {id: 3, email: 'fizfac@yandex.com', password: AES.encode("fizfuck", "n2r5u8x/A?D(G+KaPdSgVkYp3s6v9y$B")}
  ]);
};
