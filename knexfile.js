require('dotenv').load();

module.exports = {

  development: {
    client: 'postgres',
    connection: 'postgres://localhost/deep_subs',
  },

  production: {
    client: 'postgres',
    connection: `${process.env.DATABASE_URL}?ssl=true`,
  },
};
