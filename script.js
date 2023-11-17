// ************************** values form the webpage *********************

let name = document.getElementById("name");
let age = document.getElementById("age");
let address = document.getElementById("address");
let email = document.getElementById("email");
let table = document.getElementById("table");
let addDataBtn = document.getElementById("btn")

// ****** stor data in this object *******************
let data = [];

// **************** run function when yuser click addDataBtn *************
// ********************************** this function adds a new record *************************

function add() {
    addDataBtn.onclick = function () {
        let newData = {
            "name": name.value,
            "age": age.value,
            "address": address.value,
            "email": email.value
        };

        if (name.value === "" || age.value === "" || address.value === "" || email.value === "") {
            // Handle validation error (empty fields)
            alert("Please fill out all fields before adding data.");
        } else {
            data.push(newData);
            localStorage.setItem("userData", JSON.stringify(data));
            console.log(localStorage.getItem("userData"));
            setTableData();
            clearInputValues();
            alert("Data added successfully!");
        }
    };
}




// ********************************** this function deletes the clicked item *************************
function deleteRecord(dataIndex) {
    data.splice(dataIndex, 1);
    localStorage.setItem("userData", JSON.stringify(data));
    setTableData();
}

// *********************************** this function edit ***************************************
function edit(dataIndex) {
    name.value = data[dataIndex].name;
    age.value = data[dataIndex].age;
    address.value = data[dataIndex].address;
    email.value = data[dataIndex].email;

    addDataBtn.onclick = function () {
        data[dataIndex].name = name.value;
        data[dataIndex].age = age.value;
        data[dataIndex].address = address.value;
        data[dataIndex].email = email.value;
        localStorage.setItem("userData", JSON.stringify(data));
        setTableData();
        clearInputValues();
    }
}

// *********************************** this function sets up the table ***************************************
function setTableData() {
    table.innerHTML = `
    <tr>
        <th>Name</th>
        <th>Age</th>
        <th>Address</th>
        <th>Email</th>
        <th>Actions</th>
    </tr>`;

    for (let i = 0; i < data.length; i++) {
        table.innerHTML += `<tr>
            <td>${data[i].name}</td>
            <td>${data[i].age}</td>
            <td>${data[i].address}</td>
            <td>${data[i].email}</td>
            <td class="deleteAndEdit">
                <p class="Delete" onclick="deleteRecord(${i})">Delete</p>
                <p class="Edit" onclick="edit(${i})">Edit</p>
            </td>
        </tr>`;
    }

  
}







// ************************** Clear all input fild values ***************************
function clearInputValues() {
    age.value = ""
    address.value = ""
    email.value = ""
    name.value = ""

}





let jEsonData = localStorage.getItem("userData");
if (jEsonData) {
    data = JSON.parse(jEsonData);
    setTableData()
}

