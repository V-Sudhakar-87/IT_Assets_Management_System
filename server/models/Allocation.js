const mongoose = require("mongoose");

const allocationSchema = new mongoose.Schema({

    employeeId:{
        type:String,
        required:true,
        unique:true
    },

    assets:[
        {
            category:{
                type:String,
                required:true
            },

            assetId:{
                type:String,
                required:true
            },

            status:{
                type:String,
                default:"Working"
            }
        }
    ],

    allocatedDate:{
        type:Date,
        default:Date.now
    }

});

module.exports =
mongoose.model(
    "Allocation",
    allocationSchema
);