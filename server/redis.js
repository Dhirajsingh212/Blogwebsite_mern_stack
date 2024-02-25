const redis = require("redis");
const client = redis.createClient({
  url: process.env.REDIS_URL,
  // port: process.env.REDIS_PORT,
});

module.exports = client;
