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

var lectureTable = document.getElementById("lectureTable");

class Lecture {
    constructor(id, lecturename, modulname, duration, lectureDate, lecturer, studyClass) {
        this.id = id;
        this.lecturename = lecturename;
        this.modulname = modulname;
        this.lectureDate = lectureDate;
        this.studyClass = studyClass;
        this.duration = duration;
        this.lecturer = lecturer;
    }
}

function create() {
    //let name = document.getElementById("name").value;
    let id = createID();
    let lecturename = document.getElementById("lecturename").value;
    let lecturer = document.getElementById("lecturer").value;
    let modulname = document.getElementById("modulname").value;
    let duration = document.getElementById("duration").value;
    let studyClass = document.getElementById("studyClass").value;
    let lectureDate = document.getElementById("lectureDate").value;

    if(lecturename != "" && modulname != "" && studyClass != "" && duration != "" && lectureDate != ""){
        var entries = getEntries();
        var lecture = new Lecture(id, lecturename, modulname, duration, lectureDate, lecturer, studyClass);
        entries.push(lecture);
        localStorage.setItem("Lectures", JSON.stringify(entries));
    } 
}


function read() {
    var entries = getEntries();

    if(entries != null) {
        for(i = 0; i < entries.length; i++) {
            var lecturename = entries[i].lecturename;
            let modulname = entries[i].modulname;
            let lectureDate = entries[i].lectureDate;
            let studyClass = entries[i].studyClass;
            let id = entries[i].id;
            let lecturer = entries[i].lecturer;
            let duration = entries[i].duration;

            var display = document.getElementById('lectureTable');
            var newRow = display.insertRow(row);

            var cell1 = newRow.insertCell(0);
            var cell2 = newRow.insertCell(1);
            let cell3 = newRow.insertCell(2);
            let cell4 = newRow.insertCell(3);
            let cell5 = newRow.insertCell(4);
            let cell6 = newRow.insertCell(5);
            let cell7 = newRow.insertCell(6);
            //cell5.classList.add("custom-td");

            let lecturenameString = `
            <div class="d-flex align-items-center">
            <img id="img${id}"
                        src="assets/${lecturename}Logo.png"
                        class="rounded-circle"
                        alt=""
                        style="width: 45px; height: 45px"
                        />
                <div class="ms-3">
                    <p id="lecturename${id}" class="fw-bold mb-1">${lecturename}</p>
                </div>`

            let modulString = `<p id="modulname${id}" class="fw-bold mb-1">${modulname}</p>`; // string interpolation
            let durationString = `<p id="duration${id}" class="fw-bold mb-1 text-secondary">${duration}</p>`;
            let studyClassString = `<p id="studyClass${id}">${studyClass}</p>`;
            let lectureDateString = `<p id="lectureDate${id}" class="mb-1">${lectureDate}</p>`;
            let lecturerString = `<p id="lecturer${id}">${lecturer}</p>`;
            let editButtonString = `<button onclick="window.currentId = ${id}; currentFields();" id="edit${id}" type="button" class="btn btn-success me-2" data-toggle="modal" data-target="#edit">Edit</button>`
            let deleteButtonString = `<button onclick="deleteTarget('${id}'); deleteDetails()" id="delete${id}" type="button" class="btn btn-danger">Delete</button>`;
            
            cell1.innerHTML = lecturenameString;
            cell2.innerHTML = modulString;
            cell3.innerHTML = durationString;
            cell4.innerHTML = lectureDateString;
            cell5.innerHTML = lecturerString;
            cell6.innerHTML = studyClassString;
            cell7.innerHTML = editButtonString + deleteButtonString;
    
            row++;
        }
    }
}

function currentFields() {
    document.getElementById("lecturenameEdit").value = document.getElementById("lecturename" + currentId).innerHTML;
    document.getElementById("modulnameEdit").value = document.getElementById("modulname" + currentId).innerHTML;
    document.getElementById("durationEdit").value = document.getElementById("duration" + currentId).innerHTML;
    document.getElementById("studyClassEdit").value = document.getElementById("studyClass" + currentId).innerHTML;
    document.getElementById("lecturerEdit").value = document.getElementById("lecturer" + currentId).innerHTML;
    document.getElementById("lectureDateEdit").value = document.getElementById("lectureDate" + currentId).innerHTML;
}


function edit() {
    let id = window.currentId;
    let entries = getEntries();
    let index = findEntry(id);
    let entry = entries[index];
    
    entry.lecturename = document.getElementById('lecturenameEdit').value;
    entry.modulname = document.getElementById("modulnameEdit").value;
    entry.duration = document.getElementById("durationEdit").value;
    entry.studyClass = document.getElementById("studyClassEdit").value;
    entry.duration = document.getElementById("durationEdit").value;
    entry.lectureDate = document.getElementById("lectureDateEdit").value;
    entries[index] = entry;

    localStorage.setItem("Lectures", JSON.stringify(entries));
}


function deleteTarget(id) {
    let entries = getEntries();
    id = parseInt(id);
    entries = entries.filter((i) => {return i.id != id});
    localStorage.setItem("Lectures", JSON.stringify(entries));
}


function getEntries() {
    var entries = localStorage.getItem("Lectures")

    if(!entries) {
        entries = [];
        localStorage.setItem("Lectures", JSON.stringify(entries));
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

    let lecturename = document.getElementById('lecturename').value;
    let modulname = document.getElementById('modulname').value;
    let lectureDate = document.getElementById("lectureDate").value;
    let studyClass = document.getElementById("studyClass").value;
    let lecturer = document.getElementById("lecturer").value;
    let duration = document.getElementById("duration").value;
    let entries = getEntries();
    console.log(entries);
    let id = entries[entries.length-1].id;

    if (!lecturename || !modulname || !lectureDate || !lecturer || !studyClass || !duration) {
        alert("The values should not be blank");
        return;
    }

    
    var display = document.getElementById('lectureTable');
    var newRow = display.insertRow(-1);

    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    let cell3 = newRow.insertCell(2);
    let cell4 = newRow.insertCell(3);
    let cell5 = newRow.insertCell(4);
    let cell6 = newRow.insertCell(5);
    let cell7 = newRow.insertCell(6);
    //cell5.classList.add("custom-td");

    let lecturenameString = `
    <div class="d-flex align-items-center">
    <img id="img${id}"
                src="assets/${lecturename}Logo.png"
                class="rounded-circle"
                alt=""
                style="width: 45px; height: 45px"
                />
        <div class="ms-3">
            <p id="lecturename${id}" class="fw-bold mb-1">${lecturename}</p>
        </div>`

    let modulString = `<p id="modulname${id}" class="fw-bold mb-1">${modulname}</p>`; // string interpolation
    let durationString = `<p id="duration${id}" class="fw-bold mb-1 text-secondary">${duration}</p>`;
    let studyClassString = `<p id="studyClass${id}">${studyClass}</p>`;
    let lectureDateString = `<p id="lectureDate${id}" class="mb-1">${lectureDate}</p>`;
    let lecturerString = `<p id="lecturer${id}">${lecturer}</p>`;
    let editButtonString = `<button onclick="window.currentId = ${id}; currentFields();" id="edit${id}" type="button" class="btn btn-success" data-toggle="modal" data-target="#edit">Edit</button>`
    let deleteButtonString = `<button onclick="deleteTarget('${id}'); deleteDetails()" id="delete${id}" type="button" class="btn btn-danger">Delete</button>`;
    
    cell1.innerHTML = lecturenameString;
    cell2.innerHTML = modulString;
    cell3.innerHTML = durationString;
    cell4.innerHTML = lectureDateString;
    cell5.innerHTML = lecturerString;
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
    let lecturename = document.getElementById('lecturenameEdit').value;
    let modulname = document.getElementById('modulnameEdit').value;
    let lecturer = document.getElementById("lecturerEdit").value;
    let studyClass = document.getElementById("studyClassEdit").value;
    let lectureDate = document.getElementById("lectureDateEdit").value;
    let duration = document.getElementById("durationEdit").value;

    if (!lecturename || !modulname || !lecturer || !studyClass || !lectureDate || !duration) {
        alert("The values should not be blank in order to edit existing entries");
        return;
    }
    
    document.getElementById("lecturename" + currentId).innerHTML = lecturename;
    document.getElementById("modulname" + currentId).innerHTML = modulname;
    document.getElementById("lecturer" + currentId).innerHTML = lecturer;
    document.getElementById("studyClass" + currentId).innerHTML = studyClass;
    document.getElementById("lectureDate" + currentId).innerHTML = lectureDate;
    document.getElementById("duration" + currentId).innerHTML = duration;
    document.getElementById("img" + currentId).setAttribute("src", `assets/${lecturename}Logo.png`); 
  }
