const usersURL = "http://localhost:4001";
const axios = require("axios");
const redis = require("../config/redis");
class Controller {
  static async getAllUsers(req, res, next) {
    try {
      const userCache = await redis.get("user:users");

      if (userCache) {
        const data = JSON.parse(userCache);
        res.status(200).json(data);
      } else {
        const { data } = await axios.get(`${usersURL}/users`);
        await redis.set("user:users", JSON.stringify(data));
        res.status(200).json(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async getUserById(req, res, next) {
    try {
      const userCache = await redis.get("user:users");

      if (userCache) {
        const data = JSON.parse(userCache);
        res.status(200).json(data);
      } else {
        const { data } = await axios.get(`${usersURL}/users/${req.params.id}`);
        await redis.set("user:users", JSON.stringify(data));

        res.status(200).json(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async createUser(req, res, next) {
    try {
      const { username, email, password, role, phoneNumber, address } =
        req.body;
      const { data } = await axios({
        method: "post",
        url: `${usersURL}/users`,
        data: {
          username,
          email,
          password,
          role,
          phoneNumber,
          address,
        },
      });
      await redis.del("user:users");

      res.status(201).json(data);
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { data } = await axios.delete(`${usersURL}/users/${req.params.id}`);
      await redis.del("user:users");
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Controller;
