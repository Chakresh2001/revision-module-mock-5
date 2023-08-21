const mongoose = require('mongoose');
// require('dotenv').config();

const connectToServer = async()=>{
    await mongoose.connect(`mongodb+srv://chakresh1234:chakresh1234@cluster0.cqppmvp.mongodb.net/mock-5-revisonModule?retryWrites=true&w=majority`)
}

module.exports = connectToServer