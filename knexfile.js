// Update with your config settings.
require('dotenv').config('./.env');


module.exports = {
  client: 'postgresql',
  connection: {
    database: process.env.DATABASE_URL,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
  },
  production: {
    client: 'pg',
    connection: `${process.env.DATABASE_URL}?ssl=true`,
    migrations: {
      directory: 'postgres_db/migrations',
    },
    ssl: true,
    useNullAsDefault: true,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: 'postgres_db/migrations',
  },
};
