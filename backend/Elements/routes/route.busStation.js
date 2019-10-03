const express = require('express');
const router = express.Router();
const BusStation = require('../models/model.busStation');
router.get('/',(req,res)=>{
    BusStation.find().then((buses)=>{
        if(buses.length){
            res.status(200).json(buses);
        }else
            res.status(200).json({message:'No bus station records are to be found.'})
    }).catch((err)=>{
        res.status(500).json({message:'Error: '+err});
    });
});

router.post('/add',(req,res)=>{
    let reqObj = req.body;

    let BusObj = new BusStation({
        BusStationCode:reqObj.BusStationCode,
        Coordinates:reqObj.Coordinates,
        Name:reqObj.Name,
        City:reqObj.City
    });

    BusObj.save().then(()=>{
        res.status(200).json({message:'Bus station record for ID:'+reqObj.BusStationCode+', has been added successfully.'});
    }).catch((err)=>{
        res.status(500).json({message:'Error: '+err});
    });
});

router.delete('/delete/:id',(req,res)=>{
    let id=req.params.id;
   BusStation.findOneAndDelete({_id:id}).then((data)=>{
       res.status(200).json({status:200,message:'Bus Station record '+id+' has been deleted'});
   }).catch((err)=>{
       res.status(500).json({status:500,message:'Bus Station record deletion failed',error:err})
   })
});

module.exports = router;
