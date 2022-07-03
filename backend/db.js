const mongoose = require("mongoose");

const connectToMongo = async () =>{
    try{
    const url = 'mongodb://localhost:27017/iNotebook3';
    const result = await mongoose.connect(url);
    console.log('database connected successfully ...');
    }catch(err){
        console.log(err);
    }

}

module.exports = connectToMongo;