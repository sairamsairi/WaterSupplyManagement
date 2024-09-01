// const express = require('express');
// const router = express.Router();

// const {getComplaint, postComplaint, getComplaintOfUser, handlecomplaint, searchCanId} = require('../controller/complaint');

// router.get("/getcomplaints", getComplaint);
// router.post("/postcomplaint", postComplaint);
// router.post("/usercomplaint", getComplaintOfUser);
// router.put("/complaints/${complaintId}", handlecomplaint);
// router.get("/search-canid/:can", searchCanId);

// module.exports = router;


const express = require('express');
const router = express.Router();

const {getComplaint, postComplaint, getComplaintOfUser, handlecomplaint, searchCanId} = require('../controller/complaint');

//citizen
router.post("/postcomplaint", postComplaint);//not working
router.post("/usercomplaint", getComplaintOfUser);

//admin
router.get("/getcomplaints", getComplaint);
router.post("/handlecomplaint", handlecomplaint)


//To check whether the user has a canid or not
//for checking if the user has a conneciton to complaint
router.get("/search-canid/:can",searchCanId);

module.exports = router;