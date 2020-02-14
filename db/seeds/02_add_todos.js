'use strict';

exports.seed = (knex, Promise) => {
  return knex('todos')
    .then(() => knex('users').whereIn('email', ['u1@example.com', 'u2@example.com']))
    .then(users => {
      return knex('todos').insert([
        {
          title: 't1',
          description: 'd3',
          user_id: users[0].id,
        },
        {
          title: 't2',
          description: 'd2',
          user_id: users[0].id,
        },
        {
          title: 't3',
          description: 'd3',
          user_id: users[1].id,
        },
      ]);
    });
};
