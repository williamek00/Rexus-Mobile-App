const { getDb } = require("../config/mongoConnection");
const { ObjectId } = require("mongodb");
const { hashedPassword, compareHash } = require("../helpers/bcrypt");
class User {
  static userCollection() {
    return getDb().collection("users");
  }

  static async findAll() {
    const userCollection = User.userCollection();
    return userCollection.find({}, { projection: { password: 0 } }).toArray();
  }

  static async findById(userId) {
    const userCollection = User.userCollection();
    return userCollection.findOne(
      { _id: new ObjectId(userId) },
      { projection: { password: 0 } }
    );
  }

  static async create({
    username,
    email,
    password,
    role,
    phoneNumber,
    address,
  }) {
    const userCollection = User.userCollection();

    const hash = hashedPassword(password);

    const result = await userCollection.insertOne({
      username,
      email,
      password: hash,
      role,
      phoneNumber,
      address,
    });

    const insertedUser = await userCollection.findOne({
      _id: new ObjectId(result.insertedId),
    });

    return {
      _id: insertedUser._id,
      username: insertedUser.username,
      email: insertedUser.email,
      role: insertedUser.role,
      phoneNumber: insertedUser.phoneNumber,
      address: insertedUser.address,
    };
  }

  static async destroy(userId) {
    const userCollection = User.userCollection();
    userCollection.deleteOne({ _id: new ObjectId(userId) });
  }
}

module.exports = User;
