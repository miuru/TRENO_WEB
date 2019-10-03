const mongoose = require('../../_DBConfig/DBConn');
const BusStationSchema = new mongoose.Schema({
    BusStationCode:{
        type:Number,
        required:true
    },
    Coordinates:{
        lng:{
            type:Number
        },
        lat:{
            type:Number
        }
    },
    Name:{
        type:String,
        required:true
    },
    City:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('BusStation',BusStationSchema);
