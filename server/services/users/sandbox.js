// const { MongoClient } = require("mongodb");
// // Replace the uri string with your connection string.
// const uri = "mongodb://127.0.0.1:27017";

// const client = new MongoClient(uri);

// async function getUser() {
//     try {
//       const database = client.db('mongo-db');
//       const users = database.collection('users');
//       // Query for a movie that has the title 'Back to the Future'
//       const query = { title: 'Tukang Bubur Naik Haji' };
//       const user = await users.findOne(query);
//       console.log(user);
//     } finally {
//       // Ensures that the client will close when you finish/error
//       await client.close();
//     }
//   }
//   getUser().catch(console.dir);