const mongoose = require('mongoose');
const MONGODB_URL = process.env.MONGODB_URL;

const databaseConnect = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://sairisairam:mongosai@recipes.yz7rqon.mongodb.net/recipes?retryWrites=true&w=majority%22', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Successfully connected to database: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Not connected to database: ${err.message}`);
    }
};

module.exports = databaseConnect;
