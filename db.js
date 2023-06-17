const mongoose = require('mongoose');

// const mongoURI = "mongodb://127.0.0.1:27017/test"
const mongoURI="mongodb+srv://dakshagarwal:27June2002@cluster0.z1sufr5.mongodb.net/test"

const connectToMongo =async ()=>{
    await mongoose.connect(mongoURI)
}

module.exports = connectToMongo;