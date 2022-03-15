const mongo = require("../lib/mongo");
var crypto = require('crypto');
const ObjectID = require("mongodb").ObjectId;


//Create
function createUser(user) {
    user.name = crypto.createHash('md5').update(user.name).digest('hex');
    user.password = crypto.createHash('md5').update(user.password).digest('hex');
    return mongo.then((client) => {
      return client.db("apisample").collection("users").insertOne(user);
    });
  }

//Get
function getUsers() {
  return mongo.then((client) => {
    return client.db("apisample").collection("users").find({}).toArray();
  });
}

function getUser(name) {
  name = crypto.createHash('md5').update(String(name)).digest('hex');
  return mongo.then((client) => {
    return client
      .db("ampisample")
      .collection("users")
      .findOne({ "name": name });
  });
}

//Delete
function deleteUser(name) {
  name = crypto.createHash('md5').update(name).digest('hex');
  return mongo.then((client) => {
    return client
      .db("apisample")
      .collection("users")
      .deleteOne({ _name: new ObjectID(name) });
  });
}

const user = { getUsers, getUser, createUser, deleteUser};

module.exports = user;
