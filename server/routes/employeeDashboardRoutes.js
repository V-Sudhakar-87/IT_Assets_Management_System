const express = require("express");
const router = express.Router();
const bcrypt =
require("bcryptjs");

const Allocation =
require("../models/Allocation");

const Employee =
require("../models/Employee");
 
const Asset =
require("../models/Asset");
const MaintenanceRequest =
require("../models/MaintenanceRequest");
// ASSIGNED ASSETS

router.get(
"/assets/:employeeId",
async(req,res)=>{

try{

    const allocation =
    await Allocation.findOne({

        employeeId:
        req.params.employeeId

    });

    if(!allocation){

        return res.json({

            success:true,

            assets:[]

        });

    }

    const result = [];

    for(const item of allocation.assets){

        const assetDetails =
        await Asset.findOne({

            assetId:
            item.assetId

        });

        result.push({

            assetId:
            item.assetId,

            category:
            item.category,

            status:
            item.status,

            allocatedDate:
            allocation.allocatedDate,

            brand:
            assetDetails?.brand,

            model:
            assetDetails?.model,

            serialNumber:
assetDetails?.serialNumber,

purchaseDate:
assetDetails?.purchaseDate,

warrantyExpiry:
assetDetails?.warrantyExpiry

        });

    }

    res.json({

        success:true,

        assets:result

    });

}
catch(err){

    res.status(500).json({

        success:false,

        message:err.message

    });

}

});

// PROFILE

router.get(
"/profile/:employeeId",
async(req,res)=>{

try{

    const employee =
    await Employee.findOne({

        employeeId:
        req.params.employeeId

    });

    if(!employee){

        return res.status(404).json({

            success:false,

            message:
            "Employee Not Found"

        });

    }

    res.json({

        success:true,

        employee:{

            employeeId:
            employee.employeeId,

            name:
            employee.name,

            email:
            employee.email,

            role:
            employee.role,

            joinedDate:
            employee.createdAt

        }

    });

}
catch(err){

    res.status(500).json({

        success:false,

        message:err.message

    });

}

});
router.post(
"/change-password",
async(req,res)=>{

try{

    const {

        employeeId,
        oldPassword,
        newPassword

    } = req.body;

    const employee =
    await Employee.findOne({

        employeeId

    });

    if(!employee){

        return res.status(404).json({

            success:false,

            message:
            "Employee Not Found"

        });

    }

    const isMatch =
    await bcrypt.compare(

        oldPassword,

        employee.password

    );

    if(!isMatch){

        return res.status(400).json({

            success:false,

            message:
            "Old Password Incorrect"

        });

    }

    const hashedPassword =
    await bcrypt.hash(

        newPassword,

        10

    );

    employee.password =
    hashedPassword;

    await employee.save();

    res.json({

        success:true,

        message:
        "Password Updated Successfully"

    });

}
catch(err){

    res.status(500).json({

        success:false,

        message:err.message

    });

}

});
router.post(
"/request",
async(req,res)=>{

try{

    const existingRequest =
    await MaintenanceRequest.findOne({

        assetId:
        req.body.assetId,

        status:{

            $in:[
                "Pending",
                "In Progress",
                "Maintenance"
            ]

        }

    });

    if(existingRequest){

        return res.status(400).json({

            success:false,

            message:
            "Request Already Exists For This Asset"

        });

    }

    const request =
    new MaintenanceRequest({

        employeeId:
        req.body.employeeId,

        employeeName:
        req.body.employeeName,

        assetId:
        req.body.assetId,

        category:
        req.body.category,

        reason:
        req.body.reason,

        priority:
        req.body.priority

    });

    await request.save();

    res.json({

        success:true,

        message:
        "Request Raised Successfully"

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
"/requests/:employeeId",
async(req,res)=>{

try{

    const requests =
    await MaintenanceRequest
    .find({

        employeeId:
        req.params.employeeId

    })
    .sort({
        requestDate:-1
    })
    .limit(4);

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
router.get(
"/all-requests/:employeeId",
async(req,res)=>{

try{

    const requests =
    await MaintenanceRequest
    .find({

        employeeId:
        req.params.employeeId

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
router.delete(
"/request/:id",
async(req,res)=>{

try{

    const request =
    await MaintenanceRequest
    .findById(
    req.params.id
    );

    if(!request){

        return res.status(404)
        .json({

            success:false,

            message:
            "Request Not Found"

        });

    }

    if(
    request.status !==
    "Pending"
    ){

        return res.status(400)
        .json({

            success:false,

            message:
            "Cannot Delete Request"

        });

    }

    await MaintenanceRequest
    .findByIdAndDelete(

        req.params.id

    );

    res.json({

        success:true,

        message:
        "Request Deleted Successfully"

    });

}
catch(err){

    res.status(500).json({

        success:false,

        message:err.message

    });

}

});
module.exports = router;