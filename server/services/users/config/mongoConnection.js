const { MongoClient } = require("mongodb");


const client = new MongoClient(process.env.MONGO_CONNECTION);
let db 
async function connect(){
    try {   
        db = client.db("mongo-db")
        // console.log(db)

        return db
    } catch (error) {
        console.log(error)
    }
}

function getDb(){
    return db 
}

module.exports = {connect,getDb}