const express =
require("express");

const router =
express.Router();

const MaintenanceRequest =
require("../models/MaintenanceRequest");

const Allocation =
require("../models/Allocation");
// Get All Requests

router.get(
"/",
async(req,res)=>{

try{

    const requests =
await MaintenanceRequest.find({

    status:{

        $nin:[
            "Resolved",
            "Rejected"
        ],

            $in:[

                "In Progress",

                "Maintenance"

            ]

    }

})
.sort({

    requestDate:-1

});

    res.json({

        success:true,
        requests

    });

}
catch(err){

    res.status(500).json({

        success:false,
        message:err.message

    });

}

});


// Update Request

router.put(
"/:id",
async(req,res)=>{

try{

    const updated =
    await MaintenanceRequest
    .findByIdAndUpdate(

        req.params.id,

        {
            status:req.body.status,
            adminReply:req.body.adminReply
        },

        {
            returnDocument:"after"
        }

    );

    let assetStatus =
    req.body.status;

    if(
    req.body.status ===
    "Resolved"
    ){

        assetStatus =
        "Working";

    }

    await Allocation.updateOne(

        {
            "assets.assetId":
            updated.assetId
        },

        {
            $set:{

                "assets.$.status":
                assetStatus

            }

        }

    );

    res.json({

        success:true,

        request:updated

    });

}
catch(err){

    res.status(500).json({

        success:false,

        message:err.message

    });

}

});
router.get(
"/pending",
async(req,res)=>{

    const requests =
    await MaintenanceRequest.find({

        status:
        "Pending"

    });

    res.json({

        success:true,

        requests

    });

});
router.put(
"/accept/:id",
async(req,res)=>{

    await MaintenanceRequest
    .findByIdAndUpdate(

        req.params.id,

        {

            status:
            "In Progress"

        }

    );

    res.json({

        success:true

    });

});

router.get(
"/dashboard-stats",
async(req,res)=>{

    const activeRequests =
    await MaintenanceRequest.countDocuments({

        status:{
            $in:[
                "In Progress",
                "Maintenance"
            ]
        }

    });

    res.json({

        success:true,

        activeRequests

    });

});
router.get(
"/recent-requests",
async(req,res)=>{

    const requests =
    await MaintenanceRequest
    .find({

        status:"Pending"

    })

    .sort({

        requestDate:-1

    })

    .limit(4);

    res.json({

        success:true,

        requests

    });

});

module.exports =
router;