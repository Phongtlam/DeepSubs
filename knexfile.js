require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_LOCAL,
    migrations: {
      tableName: 'deep_subs',
      directory: './postgres_db/migrations',
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + '?ssl=true',
    migrations: {
      tableName: 'deep_subs',
      directory: './postgres_db/migrations',
    },
  },
};
