const express = require("express");

const router = express.Router();

const Asset =
require("../models/Asset");

router.post("/", async(req,res)=>{

    try{

        const asset =
        new Asset(req.body);

        await asset.save();

        res.json({
            success:true,
            message:"Asset Added"
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

        const assets =
        await Asset.find();

        res.json({
            success:true,
            assets
        });

    }catch(err){

        res.status(500).json({
            success:false
        });

    }

});
router.get("/available/:category", async(req,res)=>{

try{

    const category =
    req.params.category;

    const assets =
    await Asset.find({

        category,

        status:"Not Allocated"

    });

    res.json({

        success:true,

        assets

    });

}
catch(err){

    res.status(500).json({

        success:false,

        message:err.message

    });

}

});
router.delete("/:id", async(req,res)=>{

    try{

        await Asset.findByIdAndDelete(
            req.params.id
        );

        res.json({
            success:true
        });

    }catch(err){

        res.status(500).json({
            success:false
        });

    }

});
router.put("/:id", async(req,res)=>{

    try{

        await Asset.findByIdAndUpdate(

            req.params.id,

            req.body

        );

        res.json({
            success:true
        });

    }catch(err){

        res.status(500).json({
            success:false
        });

    }

});
router.get("/:id", async(req,res)=>{

    try{

        const asset =
        await Asset.findById(
            req.params.id
        );

        res.json({
            success:true,
            asset
        });

    }catch(err){

        res.status(500).json({
            success:false
        });

    }

});

module.exports = router;