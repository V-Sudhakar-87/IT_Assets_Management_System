const mongoose =
require("mongoose");

const requestSchema =
new mongoose.Schema({

    employeeId:String,

    employeeName:String,

    assetId:String,

    category:String,

    reason:String,

    priority:String,

    adminReply:{

        type:String,

        default:"Waiting for Admin"

    },

    status:{

        type:String,

        default:"Pending"

    },

    requestDate:{

        type:Date,

        default:Date.now

    }

});

module.exports =
mongoose.model(
"MaintenanceRequest",
requestSchema
);