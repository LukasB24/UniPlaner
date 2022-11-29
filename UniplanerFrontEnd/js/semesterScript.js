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

var lecturerTable = document.getElementById("semesterTable");

class Semester {
    constructor(id, start, end, name, studyClass) {
        this.id = id;
        this.name = name;
        this.start = start;
        this.end = end;
        this.studyClass = studyClass;
    }
}

function create() {
    let name = document.getElementById("name").value;
    let id = createID();
    let start = document.getElementById("start").value;
    let end = document.getElementById("end").value;
    let studyClass = document.getElementById("studyClass").value;

    if(name != "" && start != "" && end != "" && studyClass != ""){
        var entries = getEntries();
        var semester = new Semester(id, start, end, name, studyClass);
        entries.push(semester);
        localStorage.setItem("semesters", JSON.stringify(entries));
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

            var display = document.getElementById('semesterTable');
            var newRow = display.insertRow(row);

            var cell1 = newRow.insertCell(0);
            var cell2 = newRow.insertCell(1);
            let cell3 = newRow.insertCell(2);
            let cell4 = newRow.insertCell(3);
            let cell5 = newRow.insertCell(4);
            //cell5.classList.add("custom-td");

            let nameString = `<p id="name${id}" class="m-2">${name}</p>`;
            let startString = `<p id="start${id}" class="m-2">${start}</p>`; // string interpolation
            let endString = `<p id="end${id}" class="m-2">${end}</p>`;
            let studyClassString = `<p id="studyClass${id}" class="m-2">${studyClass}</p>`;
            let editButtonString = `<button onclick="window.currentId = ${id}; emptyFields();" id="edit${id}" type="button" class="btn btn-success editButton" data-toggle="modal" data-target="#edit">Edit</button>`
            let deleteButtonString = `<button onclick="deleteTarget('${id}'); deleteDetails()" id="delete${id}" type="button" class="btn btn-danger deleteButton">Delete</button>`;
            
            cell1.innerHTML = startString;
            cell2.innerHTML = endString;
            cell3.innerHTML = nameString;
            cell4.innerHTML = studyClassString;
            cell5.innerHTML = editButtonString + deleteButtonString;

            row++;
        }
    }
}

function emptyFields() {
    document.getElementById("nameEdit").value = "";
    document.getElementById("startEdit").value = "";
    document.getElementById("endEdit").value = "";
    document.getElementById("studyClassEdit").value = "";
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
    entries[index] = entry;

    localStorage.setItem("semesters", JSON.stringify(entries));
}


function deleteTarget(id) {
    let entries = getEntries();
    id = parseInt(id);
    entries = entries.filter((i) => {return i.id != id});
    localStorage.setItem("semesters", JSON.stringify(entries));
}


function getEntries() {
    var entries = localStorage.getItem("semesters")

    if(!entries) {
        entries = [];
        localStorage.setItem("semesters", JSON.stringify(entries));
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
  let entries = getEntries();
  let id = entries[entries.length-1].id;

  if (!name || !start || !end || !studyClass) {
    alert("The values should not be blank");
    return;
  }

  
  var display = document.getElementById('semesterTable');
  var newRow = display.insertRow(-1);

  var cell1 = newRow.insertCell(0);
  var cell2 = newRow.insertCell(1);
  let cell3 = newRow.insertCell(2);
  let cell4 = newRow.insertCell(3);
  let cell5 = newRow.insertCell(4);

  let nameString = `<p id="name${id}" class="m-2">${name}</p>`;
  let startString = `<p id="start${id}" class="m-2">${start}</p>`; // string interpolation
  let endString = `<p id="end${id}" class="m-2">${end}</p>`;
  let studyClassString = `<p id="studyClass${id}" class="m-2">${studyClass}</p>`;
  let editButtonString = `<button onclick="window.currentId = ${id}; emptyFields();" id="edit${id}" type="button" class="btn btn-success editButton" data-toggle="modal" data-target="#edit">Edit</button>`
  let deleteButtonString = `<button onclick="deleteTarget('${id}'); deleteDetails()" id="delete${id}" type="button" class="btn btn-danger deleteButton">Delete</button>`;
  
  cell1.innerHTML = startString;
  cell2.innerHTML = endString;
  cell3.innerHTML = nameString;
  cell4.innerHTML = studyClassString;
  cell5.innerHTML = editButtonString + deleteButtonString;

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

    if (!name || !start || !end || !studyClass) {
        alert("The values should not be blank in order to edit existing entries");
        return;
    }
    
    document.getElementById("name" + currentId).innerHTML = name;
    document.getElementById("start" + currentId).innerHTML = start;
    document.getElementById("end" + currentId).innerHTML = end;
    document.getElementById("studyClass" + currentId).innerHTML = studyClass;
  }
