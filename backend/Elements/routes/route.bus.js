const express = require('express');
const router = express.Router();
const Bus = require('../models/model.bus');
router.get('/',(req,res)=>{
    Bus.find().then((buses)=>{
        if(buses.length){
            res.status(200).json(buses);
        }else
            res.status(200).json({message:'No bus records are there to be found.'})
    }).catch((err)=>{
        res.status(500).json({message:'Error: '+err});
    });
});

router.post('/add',(req,res)=>{
    let reqObj = req.body;

    let BusObj = new Bus({
        BusId:reqObj.BusId,
        DepartureTime:reqObj.DepartureTime,
        ArrivalTime:reqObj.ArrivalTime,
        Duration:reqObj.Duration,
        DepartureStation:reqObj.DepartureStation,
        ArrivalStation:reqObj.ArrivalStation,
        Miles:reqObj.Miles,
        Price:reqObj.Price,
    });

    BusObj.save().then(()=>{
        res.status(200).json({message:'Bus record for ID:'+reqObj.BusId+', has been added successfully.'});
    }).catch((err)=>{
        res.status(500).json({message:'Error: '+err});
    });
});



module.exports = router;