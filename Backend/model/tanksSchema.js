const mongoose = require('mongoose')
const {Schema} = mongoose;

const tankSchema = new Schema({
    type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    },
    properties: {
        tankId:String,
        tank_capacity:String,
        tank_material:String,
        tank_dimensions:String,
        tank_condition:String,
        tank_color:String,
    }
});

const tankModel = mongoose.model('tanks', tankSchema)
module.exports = tankModel;