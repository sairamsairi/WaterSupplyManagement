const express = require('express')
const {addPoint, getData, addLine,getlinedata, addJunction, getJunctionData, getJunctionDataByID, getDataByCanID, addTank, getTankData} = require('../controller/addPointCor.js')
const updatedata = require('../controller/updatedata.js')
const {sendotp, verifyotp} = require('../controller/sendotp.js')
const router = express.Router();

router.post('/addpoint', addPoint);
router.get('/getdata', getData);
router.get('/getjunctiondata', getJunctionData);
router.post('/getjunctiondatabyid', getJunctionDataByID);
router.post('/addjunction', addJunction);
router.post('/addline', addLine);
router.get('/getlinedata',getlinedata);
router.post('/addtank', addTank);
router.get('/gettankdata', getTankData);
router.post('/updatepoint', updatedata);
router.post('/getdetailsbycanid', getDataByCanID);
router.post('/send-otp', sendotp);
router.post('/verify-otp', verifyotp)

module.exports = router;