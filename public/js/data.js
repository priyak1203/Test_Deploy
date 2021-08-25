console.log("Script Loaded!!!");

const dateForm = document.getElementById('date-form'); 
const tableBody = document.getElementById('table-body');
const tableContainer = document.getElementById('table-container');
const errorMessage = document.getElementById('error-msg')
// let data ; 

function getDateTime(value) {
    let d = new Date(value);
    return d.toLocaleString('en-GB');
} 

function createTableEntry(data) {
    tableBody.innerHTML = "" ;
    if (data.length === 0 ) {
        errorMessage.innerHTML = "";
        let h2 = document.createElement("h2");
        let d = new Date().toLocaleString().split(',')[0];
        h2.innerText = "No Data Found!!! Please Enter a date between 05/08/2021 to " + d;
        errorMessage.appendChild(h2);
        errorMessage.style.display = "block"; 
    }
    data.forEach((item)=> {
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

        tableBody.appendChild(tr);
        errorMessage.style.display = "none"; 
    });
}


dateForm.addEventListener('submit', (e) => {
    e.preventDefault();
   
    let dateInput = {
        start: e.target.elements.startdate.value,
        end: e.target.elements.enddate.value, 
    }
    console.log(dateInput); 
    
    

    let http = new XMLHttpRequest();
    http.open("POST", "http://localhost:3000/historicdata", true);
    http.setRequestHeader("Content-Type", "application/json");
    http.onreadystatechange = function() {
        if (this.readyState === 4 ) {
         let data = JSON.parse(this.responseText);
           createTableEntry(data);
           console.log("The data = ", data);
        }
    }
    http.send(JSON.stringify(dateInput))

    e.target.elements.startdate.value ="";
    e.target.elements.enddate.value = "";
   
})