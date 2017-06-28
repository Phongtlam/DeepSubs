// // Update with your config settings.
// require('dotenv').config('./.env');
//
//
// module.exports = {
//   development: {
//     client: 'postgresql',
//     connection: {
//       database: process.env.DB_LOCAL_URL,
//       user: process.env.DATABASE_USER,
//       password: process.env.DATABASE_PASS,
//       host: process.env.DB_HOST,
//       port: process.env.DB_PORT,
//     },
//   },
//   production: {
//     client: 'pg',
//     connection: process.env.DATABASE_URL + '?ssl=true',
//     migrations: {
//       directory: 'postgres_db/migrations',
//     },
//     useNullAsDefault: true,
//   },
//   migrations: {
//     tableName: 'knex_migrations',
//     directory: 'postgres_db/migrations',
//   },
// };

require('dotenv').config();

module.exports = {
    development: {
        client: 'pg',
        connection: 'postgres://localhost/deep_subs'
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL + '?ssl=true'
    }
};
