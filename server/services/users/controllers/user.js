const User = require("../models/user");
class UsersController {
  static async findAll(req, res, next) {
    try {
      const users = await User.findAll();
      if (!users) throw { name: "Not Found" };
      res.status(200).json({ users });
    } catch (error) {
      next(error);
    }
  }

  static async findById(req, res, next) {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) throw { name: "Not Found" };

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async createUser(req, res, next) {
    try {
      const { username, email, password, role, phoneNumber, address } =
        req.body;
      const user = await User.create({
        username,
        email,
        password,
        role,
        phoneNumber,
        address,
      });
      if (!username || !email || !password || !role || !phoneNumber || !address)
        throw { name: "Fields is required" };

      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const user = await User.destroy(req.params.userId);
   

      res
        .status(200)
        .json({ message: `Success delete ID ${req.params.userId}` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UsersController;
