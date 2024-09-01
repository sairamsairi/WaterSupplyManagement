const express = require('express');
const router = express.Router();
const {AssignComplaint, AddWorker} = require('../controller/workers');


router.post('/assigncomplaint',AssignComplaint);

router.post('/addworker',AddWorker);

module.exports = router;