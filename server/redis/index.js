const redis = require('redis');

module.exports = () => {
  const client = redis.createClient(process.env.REDIS_URL);

  client.on('error', (err) => {
    console.log(`Error ${err}`);
  });

  client.on('connect', () => {
    console.log('connected to redis');
  });
};
