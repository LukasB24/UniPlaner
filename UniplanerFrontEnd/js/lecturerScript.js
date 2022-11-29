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

var lecturerTable = document.getElementById("lecturerTable");

class Lecturer {
    constructor(id, lastname, email, lecture, studyClass) {
        this.id = id;
        this.lastname = lastname;
        this.email = email;
        this.lecture = lecture;
        this.studyClass = studyClass;
    }
}

function create() {
    let lastname = document.getElementById("surname").value;
    let id = createID();
    let email = document.getElementById("email").value;
    let lecture = document.getElementById("lecture").value;
    let studyClass = document.getElementById("studyClass").value;

    if(lastname != ""){
        var entries = getEntries();
        var lecturer = new Lecturer(id, lastname, email, lecture, studyClass)
        entries.push(lecturer);
        localStorage.setItem("Lecturers", JSON.stringify(entries));
    } 
}


function read() {
    var entries = getEntries();

    if(entries != null) {
        for(i = 0; i < entries.length; i++) {
            var surname = entries[i].lastname;
            let email = entries[i].email;
            let lecture = entries[i].lecture;
            let studyClass = entries[i].studyClass;
            let id = entries[i].id;

            var display = document.getElementById('lecturerTable');
            var newRow = display.insertRow(row);

            var cell1 = newRow.insertCell(0);
            var cell2 = newRow.insertCell(1);
            let cell3 = newRow.insertCell(2);
            let cell4 = newRow.insertCell(3);
            let cell5 = newRow.insertCell(4);
            cell5.classList.add("custom-td");

            let surnameString = `<p id="surname${id}" class="fw-bold m-2">${surname}</p>`;
            let emailString = `<p id="email${id}" class="mb-1">${email}</p>`; // string interpolation
            let lectureString = `<p id="lecture${id}" class="mb-1">${lecture}</p>`;
            let studyClassString = `<p id="studyClass${id}" class="mb-1">${studyClass}</p>`;
            let editButtonString = `<button onclick="window.currentId = ${id}; currentFields();" id="edit${id}" type="button" class="btn btn-success editButton" data-toggle="modal" data-target="#edit">Edit</button>`
            let deleteButtonString = `<button onclick="deleteTarget('${id}'); deleteDetails()" id="delete${id}" type="button" class="btn btn-danger deleteButton">Delete</button>`;
            
            cell1.innerHTML = surnameString;
            cell2.innerHTML = emailString;
            cell3.innerHTML = lectureString;
            cell4.innerHTML = studyClassString;
            cell5.innerHTML = editButtonString + deleteButtonString;

            row++;
        }
    }
}

function currentFields() {
    document.getElementById("surnameEdit").value = document.getElementById("surname" + currentId).innerHTML;
    document.getElementById("emailEdit").value = document.getElementById("email" + currentId).innerHTML;
    document.getElementById("lectureEdit").value = document.getElementById("lecture" + currentId).innerHTML;
    document.getElementById("studyClassEdit").value = document.getElementById("studyClass" + currentId).innerHTML;
}


function edit() {
    let id = window.currentId;
    let entries = getEntries();
    let index = findEntry(id);
    let entry = entries[index];
    
    entry.lastname = document.getElementById('surnameEdit').value;
    entry.email = document.getElementById("emailEdit").value;
    entry.lecture = document.getElementById("lectureEdit").value;
    entry.studyClass = document.getElementById("studyClassEdit").value;
    entries[index] = entry;

    localStorage.setItem("Lecturers", JSON.stringify(entries));
}


function deleteTarget(id) {
    let entries = getEntries();
    id = parseInt(id);
    entries = entries.filter((i) => {return i.id != id});
    localStorage.setItem("Lecturers", JSON.stringify(entries));
}


function getEntries() {
    var entries = localStorage.getItem("Lecturers")

    if(!entries) {
        entries = [];
        localStorage.setItem("Lecturers", JSON.stringify(entries));
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

  var surname = document.getElementById('surname').value;
  let email = document.getElementById('email').value;
  let lecture = document.getElementById("lecture").value;
  let studyClass = document.getElementById("studyClass").value;
  let entries = getEntries();
  let id = entries[entries.length-1].id;

  if (!surname || !email || !lecture || !studyClass) {
    alert("The values should not be blank");
    return;
  }

  
  var display = document.getElementById('lecturerTable');
  var newRow = display.insertRow(-1);

  var cell1 = newRow.insertCell(0);
  var cell2 = newRow.insertCell(1);
  let cell3 = newRow.insertCell(2);
  let cell4 = newRow.insertCell(3);
  let cell5 = newRow.insertCell(4);
  cell5.classList.add("custom-td");

  let surnameString = `<p id="surname${id}" class="fw-bold m-2">${surname}</p>`;
  let emailString = `<p id="email${id}" class="mb-1">${email}</p>`; // string interpolation
  let lectureString = `<p id="lecture${id}" class="mb-1">${lecture}</p>`;
  let studyClassString = `<p id="studyClass${id}" class="mb-1">${studyClass}</p>`;
  let editButtonString = `<button onclick="window.currentId = ${id}; currentFields();" id="edit${id}" type="button" class="btn btn-success editButton" data-toggle="modal" data-target="#edit">Edit</button>`
  let deleteButtonString = `<button onclick="deleteTarget('${id}'); deleteDetails()" id="delete${id}" type="button" class="btn btn-danger deleteButton">Delete</button>`;

  cell1.innerHTML = surnameString;
  cell2.innerHTML = emailString;
  cell3.innerHTML = lectureString;
  cell4.innerHTML = studyClassString;
  cell5.innerHTML = editButtonString + deleteButtonString;

  row++;
}


//ADDED DELETE METHOD
function deleteDetails() {

    // event.target will be the input element.
    var td = event.target.parentNode; 
    var tr = td.parentNode; // the row to be removed
    tr.parentNode.removeChild(tr);
}
  
  //ADDED EDIT METHOD
function editDetails() {
    let name = document.getElementById('surnameEdit').value;
    let email = document.getElementById('emailEdit').value;
    let lecture = document.getElementById("lectureEdit").value;
    let studyClass = document.getElementById("studyClassEdit").value;

    if (!name || !email || !lecture || !studyClass) {
        alert("The values should not be blank in order to edit existing entries");
        return;
    }
    
    document.getElementById("surname" + currentId).innerHTML = name;
    document.getElementById("email" + currentId).innerHTML = email;
    document.getElementById("lecture" + currentId).innerHTML = lecture;
    document.getElementById("studyClass" + currentId).innerHTML = studyClass;
  }
