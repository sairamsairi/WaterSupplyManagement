const mongoose = require('mongoose');
const Schema = mongoose.Schema
const workerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  city:{
    type:String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  Worker_id: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  Work_Assigned: {
      type: Boolean,
      required: false,
      default: false
  },
  Assigned_House: {
    type: String,
    required: false,
    default:''
  }
});
const WorkerModel = mongoose.model('workers', workerSchema);
module.exports = WorkerModel;