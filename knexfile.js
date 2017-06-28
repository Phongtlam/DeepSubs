// Update with your config settings.
require('dotenv').config('./.env');


module.exports = {
  client: 'postgresql',
  connection: process.env.DATABASE_URL,
  migrations: {
    tableName: 'knex_migrations',
    directory: 'postgres_db/migrations',
  },
};
