// CRUD LOGIC

window.onload = read;
//window.onload = localStorage.clear();

var submit = document.getElementById('submit');
var editButtonSubmit = document.getElementById("editButtonSubmit");
submit.addEventListener("click", create);
submit.addEventListener("click", displayDetails);
editButtonSubmit.addEventListener("click", edit)
editButtonSubmit.addEventListener("click", editDetails);

var row = 6; // auf 6, da bisher 5 hartcodierte Dozenten

var entries = getEntries();

var lectureDateTable = document.getElementById("lectureDateTable");

class LectureDate {
    constructor(id, name, start, end, duration, date, studyClass) {
        this.id = id;
        this.name = name;
        this.start = start;
        this.end = end;
        this.studyClass = studyClass;
        this.duration = duration;
        this.date = date;
    }
}

function create() {
    let name = document.getElementById("name").value;
    let id = createID();
    let start = document.getElementById("start").value;
    let end = document.getElementById("end").value;
    let duration = document.getElementById("duration").value;
    let studyClass = document.getElementById("studyClass").value;
    let date = document.getElementById("date").value;

    if(name != "" && start != "" && end != "" && studyClass != "" && duration != "" && date != ""){
        var entries = getEntries();
        var lectureDate = new LectureDate(id, name, start, end, duration, date, studyClass);
        entries.push(lectureDate);
        localStorage.setItem("LectureDates", JSON.stringify(entries));
    } 
}


function read() {
    var entries = getEntries();

    if(entries != null) {
        for(i = 0; i < entries.length; i++) {
            var name = entries[i].name;
            let start = entries[i].start;
            let end = entries[i].end;
            let studyClass = entries[i].studyClass;
            let id = entries[i].id;
            let date = entries[i].date;
            let duration = entries[i].duration;

            var display = document.getElementById('lectureDateTable');
            var newRow = display.insertRow(row);

            var cell1 = newRow.insertCell(0);
            var cell2 = newRow.insertCell(1);
            let cell3 = newRow.insertCell(2);
            let cell4 = newRow.insertCell(3);
            let cell5 = newRow.insertCell(4);
            let cell6 = newRow.insertCell(5);
            let cell7 = newRow.insertCell(6);
            //cell5.classList.add("custom-td");

            let nameString = `
            <div class="d-flex align-items-center">
            <img id="img${id}"
                 src="assets/${name}Logo.png"
                 class="rounded-circle"
                 alt=""
                 style="width: 45px; height: 45px"
                 />
            <div class="ms-3">
              <p id="name${id}" class="fw-bold mb-1">${name}</p>
            </div>`
            let startString = `<p id="start${id}" class="fw-bold mb-1">${start}</p>`; // string interpolation
            let endString = `<p id="end${id}" class="fw-bold mb-1">${end}</p>`;
            let studyClassString = `<p id="studyClass${id}" class="m-2">${studyClass}</p>`;
            let dateString = `<p id="date${id}" class="m-2">${date}</p>`;
            let durationString = `<p id="duration${id}" class="m-2">${duration}</p>`;
            let editButtonString = `<button onclick="window.currentId = ${id}; currentFields();" id="edit${id}" type="button" class="btn btn-success editButton" data-toggle="modal" data-target="#edit">Edit</button>`
            let deleteButtonString = `<button onclick="deleteTarget('${id}'); deleteDetails()" id="delete${id}" type="button" class="btn btn-danger deleteButton">Delete</button>`;
            
            cell1.innerHTML = nameString;
            cell2.innerHTML = startString;
            cell3.innerHTML = endString;
            cell4.innerHTML = durationString;
            cell5.innerHTML = dateString;
            cell6.innerHTML = studyClassString;
            cell7.innerHTML = editButtonString + deleteButtonString;

            row++;
        }
    }
}

function currentFields() {
    document.getElementById("nameEdit").value = document.getElementById("name" + currentId).innerHTML;
    document.getElementById("startEdit").value = document.getElementById("start" + currentId).innerHTML;
    document.getElementById("endEdit").value = document.getElementById("end" + currentId).innerHTML;
    document.getElementById("studyClassEdit").value = document.getElementById("studyClass" + currentId).innerHTML;
    document.getElementById("durationEdit").value = document.getElementById("duration" + currentId).innerHTML;
    document.getElementById("dateEdit").value = document.getElementById("date" + currentId).innerHTML;
}


function edit() {
    let id = window.currentId;
    let entries = getEntries();
    let index = findEntry(id);
    let entry = entries[index];
    
    entry.name = document.getElementById('nameEdit').value;
    entry.start = document.getElementById("startEdit").value;
    entry.end = document.getElementById("endEdit").value;
    entry.studyClass = document.getElementById("studyClassEdit").value;
    entry.duration = document.getElementById("durationEdit").value;
    entry.date = document.getElementById("dateEdit").value;
    entries[index] = entry;

    localStorage.setItem("LectureDates", JSON.stringify(entries));
}


function deleteTarget(id) {
    let entries = getEntries();
    id = parseInt(id);
    entries = entries.filter((i) => {return i.id != id});
    localStorage.setItem("LectureDates", JSON.stringify(entries));
}


function getEntries() {
    var entries = localStorage.getItem("LectureDates")

    if(!entries) {
        entries = [];
        localStorage.setItem("LectureDates", JSON.stringify(entries));
    }
    else {
        entries = JSON.parse(entries);
    }

    return entries;
}

function createID() {
    let id = rand();
    let valid = false;

    if(entries != null) {
        while(!valid){
            for(i=0; i<entries.length; i++) {
                if(entries[i].id === id) {
                    id = rand()
                    break;
                }
            }
            valid = true;
        }
    }
    return id;
}

function rand() {
    return Math.floor(Math.random() * (1000 - 0 + 1)) + 0;
}

function findEntry(id) {
    let entries = getEntries();
    if(entries != null){
        for(i=0; i < entries.length; i++) {
            if(entries[i].id === id) {
                return i;
            }
        }
    }
}

function displayDetails() {

  var name = document.getElementById('name').value;
  let start = document.getElementById('start').value;
  let end = document.getElementById("end").value;
  let studyClass = document.getElementById("studyClass").value;
  let date = document.getElementById("date").value;
  let duration = document.getElementById("duration").value;
  let entries = getEntries();
  let id = entries[entries.length-1].id;

  if (!name || !start || !end || !studyClass || !date || !duration) {
    alert("The values should not be blank");
    return;
  }

  
  var display = document.getElementById('lectureDateTable');
  var newRow = display.insertRow(-1);

  var cell1 = newRow.insertCell(0);
  var cell2 = newRow.insertCell(1);
  let cell3 = newRow.insertCell(2);
  let cell4 = newRow.insertCell(3);
  let cell5 = newRow.insertCell(4);
  let cell6 = newRow.insertCell(5);
  let cell7 = newRow.insertCell(6);
  //cell5.classList.add("custom-td");

  let nameString = `
  <div class="d-flex align-items-center">
  <img id="img${id}"
        src="assets/${name}Logo.png"
        class="rounded-circle"
        alt=""
        style="width: 45px; height: 45px"
        />
  <div class="ms-3">
    <p id="name${id}"class="fw-bold mb-1">${name}</p>
  </div>`
  let startString = `<p id="start${id}" class="fw-bold mb-1">${start}</p>`; // string interpolation
  let endString = `<p id="end${id}" class="fw-bold mb-1">${end}</p>`;
  let studyClassString = `<p id="studyClass${id}" class="m-2">${studyClass}</p>`;
  let dateString = `<p id="date${id}" class="m-2">${date}</p>`;
  let durationString = `<p id="duration${id}" class="m-2">${duration}</p>`;
  let editButtonString = `<button onclick="window.currentId = ${id}; currentFields();" id="edit${id}" type="button" class="btn  btn-success editButton" data-toggle="modal" data-target="#edit">Edit</button>`
  let deleteButtonString = `<button onclick="deleteTarget('${id}'); deleteDetails()" id="delete${id}" type="button" class="btn btn-danger deleteButton">Delete</button>`;

  cell1.innerHTML = nameString;
  cell2.innerHTML = startString;
  cell3.innerHTML = endString;
  cell4.innerHTML = durationString;
  cell5.innerHTML = dateString;
  cell6.innerHTML = studyClassString;
  cell7.innerHTML = editButtonString + deleteButtonString;

  row++;
}


function deleteDetails() {

    var td = event.target.parentNode; 
    var tr = td.parentNode; // the row to be removed
    tr.parentNode.removeChild(tr);
}
  

function editDetails() {
    let name = document.getElementById('nameEdit').value;
    let start = document.getElementById('startEdit').value;
    let end = document.getElementById("endEdit").value;
    let studyClass = document.getElementById("studyClassEdit").value;
    let date = document.getElementById("dateEdit").value;
    let duration = document.getElementById("durationEdit").value;

    if (!name || !start || !end || !studyClass || !date || !duration) {
        alert("The values should not be blank in order to edit existing entries");
        return;
    }
    
    document.getElementById("name" + currentId).innerHTML = name;
    document.getElementById("start" + currentId).innerHTML = start;
    document.getElementById("end" + currentId).innerHTML = end;
    document.getElementById("studyClass" + currentId).innerHTML = studyClass;
    document.getElementById("date" + currentId).innerHTML = date;
    document.getElementById("duration" + currentId).innerHTML = duration;
    document.getElementById("img" + currentId).setAttribute("src", `assets/${name}Logo.png`); 
  }
