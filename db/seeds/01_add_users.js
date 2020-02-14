'use strict';

const Bcrypt = require('bcryptjs');

exports.seed = (knex, Promise) => {
  return knex('users').del().then(() => {
    return knex('users').insert([
      {
        email: 'u1@example.com',
        password: Bcrypt.hashSync('123456'),
      },
      {
        email: 'u2@example.com',
        password: Bcrypt.hashSync('123456'),
      },
    ]);
  });
};
