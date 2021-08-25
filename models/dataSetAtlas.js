const mongoose = require('mongoose');

require('dotenv').config();

const connectionString = process.env.connection;
// const connectionString = `mongodb+srv://dbPriya:priya333@cluster1.xogr9.mongodb.net/edyodaDB?retryWrites=true&w=majority`;
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}

mongoose.connect(connectionString, options)
.then(() => console.log("Connected to MongoDB Atlas..."))
.catch(() => console.log("Error... Couldnt Connect"));

const dataSchema = new mongoose.Schema({
    "temperature": Number,
    "batteryLevel" : Number,
    "timeStamp" : String,
    "date": {type: Date, default: Date.now},
    "msTime": Number
}, {strict: false})

const dataSetAtlas = mongoose.model('datafromsensors', dataSchema);

module.exports = dataSetAtlas;