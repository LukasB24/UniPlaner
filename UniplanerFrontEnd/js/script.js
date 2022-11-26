// CRUD LOGIC

window.onload = read;
//window.onload = localStorage.clear();

var submit = document.getElementById('submit');
var editButtonSubmit = document.getElementById("editButtonSubmit");
submit.addEventListener("click", create);
submit.addEventListener("click", displayDetails);
editButtonSubmit.addEventListener("click", edit);




////////////////
//// TO DO ////
//////////////

/*
- Wenn man "editieren" drückt soll die Änderung sofort sichtbar sein (aktuell erst nach Neuladen der Seite)
- Wenn man "Delete" drückt soll die entsprechende Zeile sofort gelöscht werden (aktuell erst nach Neuladen der Seite)
*/

var row = 6; // auf 6, da bisher 5 hartcodierte Dozenten

var entries = getEntries();

var lecturerTable = document.getElementById("lecturerTable");

function Lecturer(id, lastname, email, lecture, studyClass){
    this.id = id;
    this.lastname = lastname;
    this.email = email;
    this.lecture = lecture;
    this.studyClass = studyClass;
}

function create() {
    var lastname = document.getElementById("surname").value;
    let id = createID();
    let email = document.getElementById("email").value;
    let lecture = document.getElementById("lecture").value;
    let studyClass = document.getElementById("studyClass").value;

    if(lastname != ""){
        var entries = getEntries();
        var lecturer = new Lecturer(id, lastname, email, lecture, studyClass)
        entries.push(lecturer);
        localStorage.setItem("entries", JSON.stringify(entries));
    } 
}


function read() {
    var entries = getEntries();

    if(entries != null) {
        for(i = 0; i < entries.length; i++) {
            if(entries[i] != null) {
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
                let editButtonString = `<button onclick="window.currentId = ${id}; emptyFields()" id="edit${id}" type="button" class="btn btn-success editButton" data-toggle="modal" data-target="#edit">Edit</button>`
                let deleteButtonString = `<button onclick="deleteTarget('${id}')" id="delete${id}" type="button" class="btn btn-danger deleteButton">Delete</button>`;
                
                cell1.innerHTML = surnameString;
                cell2.innerHTML = emailString;
                cell3.innerHTML = lectureString;
                cell4.innerHTML = studyClassString;
                cell5.innerHTML = editButtonString + deleteButtonString;

                row++;

            }
        }
    }
}

function emptyFields() {
    document.getElementById("surnameEdit").value = "";
    document.getElementById("emailEdit").value = "";
    document.getElementById("lectureEdit").value = "";
    document.getElementById("studyClassEdit").value = "";
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

    localStorage.setItem("entries", JSON.stringify(entries));
}


function deleteTarget(id) {
    let entries = getEntries();
    id = parseInt(id);
    let index = findEntry(id);
    delete entries[index];
    localStorage.setItem("entries", JSON.stringify(entries));
}


function getEntries() {
    var entries = localStorage.getItem("entries")

    if(!entries) {
        entries = [];
        localStorage.setItem("entries", JSON.stringify(entries));
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
                if(entries[i] != null) {
                    if(entries[i].id === id) {
                        id = rand()
                        break;
                    }
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
            if(entries[i] != null){
                if(entries[i].id === id) {
                    return i;
                }
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
  let emailString = `<p id="email${id}" class="mb-1">${email}</p>`; // string interpoleration
  let lectureString = `<p id="lecture${id}" class="mb-1">${lecture}</p>`;
  let studyClassString = `<p id="studyClass${id}" class="mb-1">${studyClass}</p>`;
  let editButtonString = `<button onclick="window.currentId = ${id}" id="edit${id}" type="button" class="btn btn-success editButton" data-toggle="modal" data-target="#edit">Edit</button>`
  let deleteButtonString = `<button onclick="delete"('${id}') id="delete${id}" type="button" class="btn btn-danger deleteButton">Delete</button>`;
  
  cell1.innerHTML = surnameString;
  cell2.innerHTML = emailString;
  cell3.innerHTML = lectureString;
  cell4.innerHTML = studyClassString;
  cell5.innerHTML = editButtonString + deleteButtonString;

  row++;
}


/*
function deleteDetails() {

  //var name = document.getElementById('name').value;
  var surname = document.getElementById('surname').value;
  var id = document.getElementById('id').value;

  if (surname==null || id==null) {
    alert("No values to delete");
    return;
  }
  var display = document.getElementById('display');
  var newRow = display.deleteRow(row-1);

  row--;
}

function editDetails() {
  alert("Input new values to change current details");
  var name = document.getElementById('name').value;
  var surname = document.getElementById('surname').value;
  var id = document.getElementById('id').value;

  if (!name || !surname || !id) {
    alert("The values should not be blank");
    return;
  }

  var display = document.getElementById('display');
  var newRow = display.insertRow(row);
  var oldRow = display.deleteRow(row-1);

  var cell1= newRow.insertCell(0);
  var cell2= newRow.insertCell(1);
  var cell3= newRow.insertCell(2);

  cell1.innerHTML = name;
  cell2.innerHTML = surname;
  cell3.innerHTML = id;
}
*/