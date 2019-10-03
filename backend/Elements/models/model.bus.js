const mongoose = require('../../_DBConfig/DBConn');
const BusSchema = new mongoose.Schema({
    BusId:{
        type:Number,
        required:true
    },
    DepartureTime:{
        type:String,
        required:true
    },
    ArrivalTime:{
        type:String,
        required:true
    },
    Duration:{
        type:String,
        required:true
    },
    DepartureStation:{
        type:String,
        required:true
    },
    ArrivalStation:{
        type:String,
        required:true
    },
    Miles:{
        type:Number,
        required:true
    },
    Price:{
        type:Number,
        required:true
    }
});

module.exports = mongoose.model('Bus',BusSchema);