const mongoose = require('mongoose');

function connectDB(){
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("Mongo Db Connected");
        
    })
    .catch((err)=>{
        console.log("Mongo db failed to cennect",err);
    })
}

module.exports = connectDB; 