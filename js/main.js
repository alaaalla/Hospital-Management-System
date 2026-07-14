var PatientName = document.getElementById("PatientName");
var DoctorID = document.getElementById("DoctorID");
var PatientStatus = document.getElementById("PatientStatus");
var Time = document.getElementById("Time");
var date = document.getElementById("date");
var save = document.getElementById("save");
var counter;
var PatientsList;
localStorage.getItem("PatientsList") == null ? PatientsList = [] : PatientsList = JSON.parse(localStorage.getItem("PatientsList"));
displayPatient(PatientsList);
function addPatient() {
    var Patient = {
        name: PatientName.value,
        ID: DoctorID.value,
        Status: PatientStatus.value,
        Time: Time.value,
        date: date.value
    };
    if (validateName() && validateID() && validateStatus() && validateTime() && validateDate()) {
        PatientsList.push(Patient);
        localStorage.setItem("PatientsList", JSON.stringify(PatientsList));
        displayPatient(PatientsList);
        validateName();
        validateID();
        validateStatus();
        validateTime();
        validateDate();
        clearInput();
        save.classList.add("d-none");
    }
}

function displayPatient(data) {
    var cartona = ``;
    for (var i = 0; i < data.length; i++) {
        cartona += `<tr>
            <td>${i + 1}</td>
            <td>${data[i].newName ? data[i].newName : data[i].name}</td>
            <td>${data[i].ID}</td>
            <td>${data[i].Status}</td>
            <td>${data[i].Time}</td>
            <td>${data[i].date}</td>
            <td><button class="btn btn-warning" onclick ="UpdatePatient(${i})">Update</button></td>
            <td><button onclick="deletePatient(${i})" class="btn btn-danger">Delete</button></td>
        </tr>`;
    }
    document.getElementById("demo").innerHTML = cartona;
}

function deletePatient(index) {
    PatientsList.splice(index, 1)
    localStorage.setItem("PatientsList", JSON.stringify(PatientsList));
    displayPatient(PatientsList);
}

function clearInput() {
    PatientName.value = '',
        DoctorID.value = '',
        PatientStatus.value = '',
        Time.value = '',
        date.value = ''
};

function UpdatePatient(index) {
    PatientName.value = PatientsList[index].name,
        DoctorID.value = PatientsList[index].ID,
        PatientStatus.value = PatientsList[index].Status,
        Time.value = PatientsList[index].Time,
        date.value = PatientsList[index].date,
        counter = index;
    save.classList.remove("d-none")
}

function saveUpdate() {
    PatientsList[counter].name = PatientName.value,
        PatientsList[counter].ID = DoctorID.value,
        PatientsList[counter].Status = PatientStatus.value,
        PatientsList[counter].Time = Time.value,
        PatientsList[counter].date = date.value
    localStorage.setItem("PatientsList", JSON.stringify(PatientsList));
    displayPatient(PatientsList);
    save.classList.add("d-none");
    clearInput();
}
function validateName() {
    var regex = /^[A-Z]/;
    if (regex.test(PatientName.value)) {
        PatientName.style.border = "none";
        document.getElementById("invalidName").classList.add("d-none");
        return true;
    }
    else {
        PatientName.style.border = "solid 4px red";
        document.getElementById("invalidName").classList.remove("d-none");
        return false;
    }
}
function validateID() {
    var regex = /^[0-9]+/
    if (regex.test(DoctorID.value)) {
        DoctorID.style.border = "none";
        document.getElementById("invalidNumber").classList.add("d-none");
        return true;
    }
    else {
        DoctorID.style.border = "solid 4px red";
        document.getElementById("invalidNumber").classList.remove("d-none");
        return false;
    }
}

function validateStatus() {
    var regex = /^[A-Z]/
    if (regex.test(PatientStatus.value)) {
        PatientStatus.style.border = "none";
        document.getElementById("invalidStatus").classList.add("d-none");
        return true;
    }
    else {
        PatientStatus.style.border = "solid 4px red";
        document.getElementById("invalidStatus").classList.remove("d-none");
        return false;
    }
}
function validateTime() {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (regex.test(Time.value)) {
        Time.style.border = "none";
        document.getElementById("invalidTime").classList.add("d-none");
        return true;
    }
    else {
        Time.style.border = "solid 4px red";
        document.getElementById("invalidTime").classList.remove("d-none");
        return false;
    }
}
function validateDate() {
    var regex = /^\d{4}-\d{2}-\d{2}$/;
    if (regex.test(date.value)) {
        date.style.border = "none";
        document.getElementById("invalidDate").classList.add("d-none");
        return true;
    }
    else {
        date.style.border = "solid 4px red";
        document.getElementById("invalidDate").classList.remove("d-none");
        return false;
    }
}
function searchPatient(input) {
    var newPatientsList = [];
    for (var i = 0; i < PatientsList.length; i++) {
        if (PatientsList[i].name.toLowerCase().includes(input.toLowerCase())) {
            var regex = RegExp()
            PatientsList[i].newName = PatientsList[i].name.toLowerCase().replaceAll(regex, `<span class="text-success">${input}</span>`)
            newPatientsList.push(PatientsList[i]);
        }
        displayPatient(newPatientsList);
    }
}
