const express = require("express");
const bcrypt = require("bcryptjs");

const Employee =
require("../models/Employee");

const router =
express.Router();
router.post("/", async(req,res)=>{

    try{

        const {
            employeeId,
            name,
            email,
            password,
            role,
            joinDate,
            status
        } = req.body;

        const hashedPassword =
        await bcrypt.hash(
            password,
            10
        );

        const employee =
        new Employee({

            employeeId,
            name,
            email,

            password:
            hashedPassword,

            role,
            joinDate,
            status
        });

        await employee.save();

        res.json({
            success:true,
            message:
            "Employee Added"
        });

    }catch(err){

        res.status(500).json({
            success:false,
            message:err.message
        });

    }

});
router.get("/", async(req,res)=>{

    try{

        const employees =
        await Employee.find();

        res.json({
            success:true,
            employees
        });

    }catch(err){

        res.status(500).json({
            success:false
        });

    }

});
router.get("/:id",async(req,res)=>{

    const employee =
    await Employee.findById(
        req.params.id
    );

    res.json({
        employee
    });

});
router.put("/:id",async(req,res)=>{

    await Employee.findByIdAndUpdate(

        req.params.id,

        req.body

    );

    res.json({

        success:true

    });

});
router.delete("/:id", async(req,res)=>{

    await Employee.findByIdAndDelete(
        req.params.id
    );

    res.json({
        success:true
    });

});
module.exports = router;