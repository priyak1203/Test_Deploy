console.log("Script Loaded!!!!");

const tbody = document.getElementById('table-body');

const dataContainer = document.getElementById('data-wrapper');

const clientSocket = io();

let status = "JOINED THE SERVER"
clientSocket.emit('joinStatus', status); 


// Runs when Data received from server 
clientSocket.on('sendData', dataList => {
    console.log("Data Received = ", dataList); 
    outputData(dataList)
})


function getDateTime(value) {
    let d = new Date(value);
    return d.toLocaleString('en-GB');
} 


function outputData(data) {
    tbody.innerHTML = "";
    
    data.forEach((item) => {
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        td1.innerText = item.temperature;
        tr.appendChild(td1);

        let td2 = document.createElement('td');
        td2.innerText = item.batteryLevel;
        tr.appendChild(td2);

        let td3 = document.createElement('td');
        td3.innerText = getDateTime(item.msTime);
        tr.appendChild(td3);

        tbody.appendChild(tr);

    });
}

