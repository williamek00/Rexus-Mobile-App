const Redis = require("ioredis")

const redis = new Redis({
    port: 14975, // Redis port
    host: "redis-14975.c292.ap-southeast-1-1.ec2.cloud.redislabs.com", // Redis hos
    password: process.env.REDIS_PASSWORD || "6SIiz9Tz43n5pV25JQKYGKMfWaoV8oua",
  });

module.exports = redis