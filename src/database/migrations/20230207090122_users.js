/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.withSchema('public').createTable('users', table => {
        table.increments('id').primary().comment('Идентификатор пользователя')
        table.string('username').unique().notNullable().comment('Имя пользователя')
        table.string('email').unique().notNullable().comment('E-mail пользователя')
        table.string('phone').comment('Телефон пользователя')
        table.string('password').notNullable().comment('Пароль пользователя')
        table.string('token').comment('Токен пользователя')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.withSchema('public').dropTableIfExists('users');
};