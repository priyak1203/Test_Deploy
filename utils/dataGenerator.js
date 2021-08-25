// Function to generate random number between 2 numbers 
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min+ 1)) + min;
}

// Function to generate timestamp
function getTimeStamp() {
    let d = new Date();
    let day = String(d.getDate()).padStart(2, '0'); 
    let month = String(d.getMonth()+1).padStart(2, '0');
    let year = String(d.getFullYear());
    return  `${day}-${month}-${year}` ;
}

// Function to generate data documents 
function dataGenerator() {
    return {
        temperature: getRandomNumber(20,30),
        batteryLevel : getRandomNumber(80, 100),
        timeStamp : getTimeStamp(),
        msTime: Date.now()
    }
}
module.exports = dataGenerator; 