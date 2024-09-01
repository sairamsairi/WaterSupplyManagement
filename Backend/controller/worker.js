const WorkerModel = require('../model/WorkerModel')

const generateWorkerId = async () => {
    const min = 100000;
    const max = 999999;
  
    let isUnique = false;
    let randomNumber;
  
    while (!isUnique) {
      randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  
      // Check if the number is unique in the database
      const existingConnection = await WorkerModel.findOne({ Worker_id: randomNumber });
  
      isUnique = !existingConnection;
    }
  
    return randomNumber;
  };

const AssignComplaint = async (req, res) => {
  const { city } = req.body;
  try {
    // Find the first worker in the given city where Work_Assigned is false
    const foundWorker = await WorkerModel.findOne({ city: city, Work_Assigned: false });

    if (foundWorker) {
      // Update the Work_Assigned field to true
      const updatedWorker = await WorkerModel.findOneAndUpdate(
        { _id: foundWorker._id }, // Use the _id of the found worker
        { $set: { Work_Assigned: true } }, // Update the Work_Assigned field
        { new: true } // Return the updated document
      );

      res.status(200).json(updatedWorker);
    } else {
      res.status(404).json({ message: 'No available worker found in the specified city' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error while finding/updating a worker' });
  }
};


const AddWorker= async (req, res) => {
    try {
        const { name, phoneNumber, city, email, password } = req.body;
        const Worker_id = await generateWorkerId();
        
        // Use the create method to create and save a new worker document
        const newWorker = await WorkerModel.create({
          name,
          phoneNumber,
          city,
          email,
          Worker_id:Worker_id,
          password
        });
    
        res.status(201).json({ message: 'Worker created successfully', worker: newWorker });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    };



module.exports = {AssignComplaint, AddWorker};