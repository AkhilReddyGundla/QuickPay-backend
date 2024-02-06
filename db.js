
require('dotenv').config()
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required: true,
        trim:true,
        minLength : 2,
        maxLength : 50,
    },
    password : {
        type : String,
        required : true,
        trim:true,
        minLength :2,
        maxLength : 100
    },
    firstName : {
        type : String,
        required : true,
        trim : true,
        maxLength : 20
    },
    lastName : {
        type : String,
        required : true,
        trim : true,
        maxLength : 20
    }
})

const bankSchema = mongoose.Schema({
    username :{
        type : String,
        ref : "User",
        required : true 
    },
    userId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    balance : {
        type : Number,
        required : true
    }
})


const User = mongoose.model("User",userSchema);
const Accounts = mongoose.model("Accounts",bankSchema)
module.exports = {
    User,Accounts
}