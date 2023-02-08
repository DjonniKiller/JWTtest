/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.withSchema('public').createTable('posts', table => {
    table.increments('id').primary().comment('Идентификатор публикации')
    table.string('header').comment('Заголовок публикации')
    table.string('text', 1000).comment('Содержание публикации')
    table.integer('user').notNullable().comment('Автор публикации')

    table.foreign('user')
        .references('users.id')
        .onUpdate('Cascade')
        .onDelete('Cascade')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.withSchema('public').dropTableIfExists('posts');
};
