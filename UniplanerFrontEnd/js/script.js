//Scroll-To-Top-Button

let calcScrollValue = () => {
    let scrollProgress = document.getElementById("progress");
    let progressValue = document.getElementById("progress-value");
    let pos = document.documentElement.scrollTop;
    let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollValue = Math.round((pos * 100) / calcHeight);
    console.log(calcHeight);
    
    if(pos > 100){
        scrollProgress.style.display = "grid";
    }
    else{
        scrollProgress.style.display = "none";
    }

    scrollProgress.addEventListener("click", () =>{
        document.documentElement.scrollTop = 0;
    });
    
    scrollProgress.style.background = `conic-gradient(#03cc65 ${scrollValue}%, #d7d7d7 ${scrollValue}%)`
}

window.onscroll = calcScrollValue;
window.onload = calcScrollValue;

//End Scroll-To-Top-Button





// Memory Logic

window.onload = read;

var submit = document.getElementById('submit');

submit.addEventListener("click", create);
submit.addEventListener("click", displayDetails);

/*
var clear = document.getElementById('clear');

clear.addEventListener("click", deleteTarget);
clear.addEventListener("click", deleteDetails);

var edit = document.getElementById('edit');
edit.addEventListener("click", update);
edit.addEventListener("click", editDetails);
*/

var row = 1;

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
    //document.getElementById("id").value = id;  
}


function read() {
    var entries = getEntries();

    if(entries != null) {
        for(i = 0; i < entries.length; i++) {
            if(entries[i] != null) {
                let row = document.createElement("tr");
                //let id = document.createElement("td");
                let lastnameTd = document.createElement("td");
                let lastname = document.createElement("p");
                let emailTd = document.createElement("td");
                let email = document.createElement("p");
                let lectureTd = document.createElement("td");
                let lecture = document.createElement("p")
                let studyClassTd = document.createElement("td");
                let studyClass = document.createElement("p");
                let buttonsTd = document.createElement("td");
                let editButton = document.createElement("button")
                let deleteButton = document.createElement("button");

                editButton.setAttribute("type", "button");
                editButton.setAttribute("class", "btn btn-success");
                editButton.setAttribute("data-toggle", "modal");
                editButton.setAttribute("data-target", "#edit");
                editButton.innerHTML = "Edit";
                editButton.classList.add("editButton");
                
                deleteButton.setAttribute("type", "button");
                deleteButton.setAttribute("class", "btn btn-danger");
                deleteButton.innerHTML = "Delete";
                deleteButton.classList.add("deleteButton")

                row.classList.add("custom-rows");
                lastname.className = "fw-bold m-2";
                lastnameTd.className = "fw-bold m-2";
                lastname.innerHTML = entries[i].lastname;

                email.className = "mb-1";
                emailTd.className = "mb-1";
                email.innerHTML = entries[i].email;

                lecture.className = "mb-1";
                lectureTd.className = "mb-1";
                lecture.innerHTML = entries[i].lecture;

                studyClass.className = "mb-1";
                studyClassTd.className = "mb-1";
                studyClass.innerHTML = entries[i].studyClass;

                buttonsTd.classList.add("custom-td");

                lecturerTable.appendChild(row);
                row.appendChild(lastnameTd);
                lastnameTd.appendChild(lastname);
                row.appendChild(emailTd);
                emailTd.appendChild(email);
                row.appendChild(lectureTd);
                lectureTd.appendChild(lecture);
                row.appendChild(studyClassTd);
                studyClassTd.appendChild(studyClass);

                row.appendChild(buttonsTd);
                buttonsTd.appendChild(editButton);
                buttonsTd.appendChild(deleteButton);
            }
        }
    }
}

/*
function update() {
    let lastname = document.getElementById("surname").value;
    let id = document.getElementById("id").value;
    id = parseInt(id);

    var target = entries[findEntry(id)];
    target.lastname = lastname;
    localStorage.setItem("entries", JSON.stringify(entries));

}

function deleteTarget() {
    let entries = getEntries();
    let id = document.getElementById("id").value;
    id = parseInt(id);
    let index = findEntry(id);
    delete entries[index];
    localStorage.setItem("entries", JSON.stringify(entries));
}
*/

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

  //var name = document.getElementById('name').value;
  var surname = document.getElementById('surname').value;
  let email = document.getElementById('email').value;
  let lecture = document.getElementById("lecture").value;
  let studyClass = document.getElementById("studyClass").value;


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

  let surnameString = `<p class="fw-bold m-2">${surname}</p>`;
  let emailString = `<p class="mb-1">${email}</p>`; // string interpoleration
  let lectureString = `<p class="mb-1">${lecture}</p>`;
  let studyClassString = `<p class="mb-1">${studyClass}</p>`;
  let editButtonString = `<button type="button" class="btn btn-success editButton" data-toggle="modal" data-target="#edit">Edit</button>`
  let deleteButtonString = `<button type="button" class="btn btn-danger deleteButton">Delete</button>`;

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