const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({

    employeeId:{
        type:String,
        required:true,
        unique:true
    },

    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },

    role:{
        type:String,
        default:"employee"
    },

    joinDate:{
        type:Date
    },

    status:{
        type:String,
        default:"Active"
    }

},{
    timestamps:true
});

module.exports =
mongoose.model(
"Employee",
employeeSchema
);