/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.withSchema('public').createTable('users', table => {
        table.increments('id').comment('Идентификатор пользователя')
        table.string('username').notNullable().comment('Имя пользователя')
        table.string('email').notNullable().comment('E-mail пользователя')
        table.string('phone').comment('Телефон пользователя')
        table.string('password').notNullable().comment('Пароль пользователя')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.withSchema('public').dropTableIfExists('users');
};