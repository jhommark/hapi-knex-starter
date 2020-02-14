'use strict';

exports.up = (knex, Promise) => {

  return knex.schema.createTable('todos', (table) => {
    table.increments();
    table.string('title');
    table.text('description');

    table.integer('user_id').references('id').inTable('users');

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = (knex, Promise) => {

  return knex.schema.dropTable('todos');
};
