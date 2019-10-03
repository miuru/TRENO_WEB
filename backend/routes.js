const express = require('express');

const router = express.Router();
const UserRoutes = require('./Elements/routes/route.user')
const BusRoutes = require('./Elements/routes/route.bus');
const BusStations = require('./Elements/routes/route.busStation');
router.use('/bus',BusRoutes);
router.use('/user',UserRoutes);
router.use('/station',BusStations);
module.exports = router;
