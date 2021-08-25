const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const express = require('express');

const dataGenerator = require('./utils/dataGenerator');
const dataSetAtlas = require('./models/dataSetAtlas');


const app = express(); 
const server = http.createServer(app);
const io = socketio(server);

// Middlewares
app.use(express.json());

// Set Static Folder 
app.use(express.static(path.join(__dirname, 'public')));



// =========  Function to generate and save data in DB =========== // 
setInterval(async () => {
    let data = dataGenerator();
    await dataSetAtlas.insertMany(data); 
}, 10000) 


// Run when client connects 
io.on('connection', socket => {
    socket.on('joinStatus', (status) => {
        console.log(`${status} with id: ${socket.id}`);
        
        // ====== Function to fetch recent 20 data every 10 seconds ======= //
        setInterval(async () => {
            let dataList = []; 
            dataList = await dataSetAtlas.find().sort({$natural:-1}).limit(20);
            io.emit('sendData', dataList);
               
        }, 10000);  
    }); 
});


// API  to fetch historic data 
app.post('/historicdata', async (req, res) => {
    const {start, end} = req.body; 
    let first = start.split("-").reverse().join("-");
    let last = end.split("-").reverse().join("-");
    let dataList = await dataSetAtlas.find({timeStamp: {$gte:first, $lte:last}});

    res.send(dataList);
}); 


const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on Port: ${PORT}`));
