const mongoose = require("mongoose");

const uri = process.env.MONGO_URI;

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(uri);
        console.log("MongoDb Connected:" + conn.connection.host);
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;