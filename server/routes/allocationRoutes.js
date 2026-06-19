const express = require("express");
const router = express.Router();

const Allocation =
require("../models/Allocation");

const Employee =
require("../models/Employee");

const Asset =
require("../models/Asset");


// CREATE ALLOCATION

router.post("/", async(req,res)=>{

try{

    const {
        employeeId,
        assets
    } = req.body;

    // Employee Check

    const employee =
    await Employee.findOne({
        employeeId
    });

    if(!employee){

        return res.status(400).json({
            success:false,
            message:"Employee ID not found"
        });

    }

    // Duplicate Employee Allocation

    const existingEmployee =
    await Allocation.findOne({
        employeeId
    });

    if(existingEmployee){

        return res.status(400).json({
            success:false,
            message:"Employee already allocated"
        });

    }

    // Asset Validation

    for(const item of assets){

        const asset =
        await Asset.findOne({
            assetId:item.assetId
        });

        if(!asset){

            return res.status(400).json({
                success:false,
                message:
                `${item.assetId} not found`
            });

        }

        const allocatedAsset =
        await Allocation.findOne({
            "assets.assetId":
            item.assetId
        });

        if(allocatedAsset){

            return res.status(400).json({
                success:false,
                message:
                `${item.assetId} already allocated`
            });

        }

    }

    const allocation =
    new Allocation({

        employeeId,
        assets

    });

    await allocation.save();

    res.json({

        success:true,
        message:
        "Asset Allocated Successfully"

    });
    for(const item of assets){

    const result =
    await Asset.updateOne(

        {
            assetId:item.assetId
        },

        {
            status:"Allocated"
        }

    );

    //console.log(result);

}

}
catch(err){

    res.status(500).json({

        success:false,
        message:err.message

    });

}

});

router.get("/recent/latest", async(req,res)=>{

try{

    const allocations =
    await Allocation
    .find()
    .sort({ allocatedDate:-1 })
    .limit(4);

    const result = [];

    for(const allocation of allocations){

        const employee =
        await Employee.findOne({

            employeeId:
            allocation.employeeId

        });

        result.push({

            employeeId:
            allocation.employeeId,

            name:
            employee?.name,

            role:
            employee?.role,

            totalAssets:
            allocation.assets.length

        });

    }

    res.json({

        success:true,

        allocations:result

    });

}
catch(err){

    res.status(500).json({

        success:false,
        message:err.message

    });

}

});
// GET ALL ALLOCATIONS

router.get("/", async(req,res)=>{

try{

    const allocations =
    await Allocation.find();

    const result = [];

    for(const allocation of allocations){

        const employee =
        await Employee.findOne({

            employeeId:
            allocation.employeeId

        });

        result.push({

            employeeId:
            allocation.employeeId,

            name:
            employee?.name,

            role:
            employee?.role,

            totalAssets:
            allocation.assets.length,

            working:
            allocation.assets.filter(
            a => a.status === "Working"
            ).length,

            maintenance:
            allocation.assets.filter(
            a => a.status === "Maintenance"
            ).length

        });

    }

    res.json({

        success:true,

        allocations:result

    });

}
catch(err){

    res.status(500).json({

        success:false,

        message:err.message

    });

}

});
router.get("/stats/count", async(req,res)=>{

try{

    const allocations =
    await Allocation.find();

    let allocatedAssets = 0;

    allocations.forEach(allocation=>{

        allocatedAssets +=
        allocation.assets.length;

    });

    res.json({

        success:true,

        allocatedAssets

    });

}
catch(err){

    res.status(500).json({

        success:false,

        message:err.message

    });

}

});
router.get("/stats/monthly", async(req,res)=>{

try{

    const allocations =
    await Allocation.find();

    const monthlyData =
    Array(12).fill(0);

    allocations.forEach(allocation=>{

        const month =
        new Date(
        allocation.allocatedDate
        ).getMonth();

        monthlyData[month] +=
        allocation.assets.length;

    });

    res.json({

        success:true,

        monthlyData

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
"/reports/range",
async(req,res)=>{

try{

    const {
        fromDate,
        toDate
    } = req.query;

    let allocations;

    if(fromDate && toDate){

    const startDate =
    new Date(fromDate);

    const endDate =
    new Date(toDate);

    endDate.setHours(
        23,
        59,
        59,
        999
    );

    allocations =
    await Allocation.find({

        allocatedDate:{

            $gte:startDate,

            $lte:endDate

        }

    });

}
    else{

        allocations =
        await Allocation.find();

    }

    const result = [];

    for(const allocation of allocations){

        const employee =
        await Employee.findOne({

            employeeId:
            allocation.employeeId

        });

        result.push({

            employeeId:
            allocation.employeeId,

            name:
            employee?.name,

            role:
            employee?.role,

            totalAssets:
            allocation.assets.length,

            allocatedDate:
            allocation.allocatedDate

        });

    }

    res.json({

        success:true,

        allocations:result

    });

}
catch(err){

    res.status(500).json({

        success:false,

        message:err.message

    });

}

});
router.get("/:employeeId", async(req,res)=>{

    const allocation =
    await Allocation.findOne({

        employeeId:
        req.params.employeeId

    });

    const employee =
    await Employee.findOne({

        employeeId:
        req.params.employeeId

    });

    res.json({

        success:true,

        employee,

        allocation

    });

});
router.put("/:employeeId", async(req,res)=>{

try{

    const employeeId =
    req.params.employeeId;

    const newAssets =
    req.body.assets;

    const allocation =
    await Allocation.findOne({
        employeeId
    });

    if(!allocation){

        return res.status(404).json({
            success:false,
            message:"Allocation Not Found"
        });

    }

    const oldAssets =
    allocation.assets;

    // Removed Assets

    for(const oldAsset of oldAssets){

        const stillExists =
        newAssets.find(
        a =>
        a.assetId === oldAsset.assetId
        );

        if(!stillExists){

            await Asset.updateOne(

                {
                    assetId:
                    oldAsset.assetId
                },

                {
                    status:
                    "Not Allocated"
                }

            );

        }

    }

    // New Assets

    for(const newAsset of newAssets){

        const alreadyExists =
        oldAssets.find(
        a =>
        a.assetId === newAsset.assetId
        );

        if(!alreadyExists){

            await Asset.updateOne(

                {
                    assetId:
                    newAsset.assetId
                },

                {
                    status:
                    "Allocated"
                }

            );

        }

    }

    allocation.assets =
    newAssets;

    await allocation.save();

    res.json({

        success:true,

        message:
        "Allocation Updated"

    });

}
catch(err){

    res.status(500).json({

        success:false,

        message:err.message

    });

}

});
router.delete("/:employeeId", async(req,res)=>{

try{

    const allocation =
    await Allocation.findOne({

        employeeId:
        req.params.employeeId

    });

    if(!allocation){

        return res.status(404).json({

            success:false,

            message:
            "Allocation Not Found"

        });

    }

    // Assets Release

    for(const asset of allocation.assets){

        await Asset.updateOne(

            {
                assetId:
                asset.assetId
            },

            {
                status:
                "Not Allocated"
            }

        );

    }

    // Delete Allocation

    await Allocation.deleteOne({

        employeeId:
        req.params.employeeId

    });

    res.json({

        success:true,

        message:
        "Allocation Deleted Successfully"

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