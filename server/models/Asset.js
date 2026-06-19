const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema({

    assetId:{
        type:String,
        required:true,
        unique:true
    },

    category:{
        type:String,
        required:true
    },

    brand:{
        type:String,
        required:true
    },

    model:{
        type:String,
        required:true
    },

    serialNumber:{
        type:String,
        required:true,
        unique:true
    },

    purchaseDate:{
        type:Date
    },

    warrantyExpiry:{
        type:Date
    },

    status:{
        type:String,
        enum:[
            "Not Allocated",
            "Allocated",
            "Maintenance"
        ],
        default:"Not Allocated"
    }

});

module.exports =
mongoose.model(
    "Asset",
    assetSchema
);