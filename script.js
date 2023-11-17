// ************************** values form the webpage *********************

let name = document.getElementById("name");
let age = document.getElementById("age");
let address = document.getElementById("address");
let email = document.getElementById("email");
let table = document.getElementById("table");
let addDataBtn = document.getElementById("btn")
let popup = document.getElementById("popup");
// ****** stor data in this object *******************
let data = [];

// **************** run function when yuser click addDataBtn *************
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
            ifBlank()
           
        } else {
            data.push(newData);
            localStorage.setItem("userData", JSON.stringify(data));
            setTableData();
            clearInputValues();
            ifAddRecord();
        }
    }
}

// let allDeleteBtns = document.querySelectorAll(".Delete");
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
                <td class="deleteAndEdit"><p class="Delete">Delete</p><p class="Edit">Edit</p></td>
            </tr>`;
    }

    edit();
    deleteRecord();
}
// ********************************** this function delete the clicked item *************************
function deleteRecord() {
    let allDeleteBtns = document.querySelectorAll(".Delete");
    allDeleteBtns.forEach((deleteBtn, dataIndex) => {
        deleteBtn.onclick = function () {
            data.splice(dataIndex, 1);
            localStorage.setItem("userData", JSON.stringify(data));
            setTableData();
            ifDeleteRecord();
        };
    });
}

// *********************************** edit value ***************************************888

function edit() {
    let allEditBtns = document.querySelectorAll(".Edit");
    allEditBtns.forEach((editBtn, dataIndex) => {
        editBtn.onclick = function () {
            name.value = data[dataIndex].name;
            age.value = data[dataIndex].age;
            address.value = data[dataIndex].address;
            email.value = data[dataIndex].email;
            console.log(data[dataIndex].age);
            addDataBtn.onclick = function () {
                data[dataIndex].name = name.value;
                data[dataIndex].age = age.value;
                data[dataIndex].address = address.value;
                data[dataIndex].email = email.value;
                localStorage.setItem("userData", JSON.stringify(data));
                setTableData();
                clearInputValues();
                addDataBtn.innerHTML = 'Add Data';
                ifEditRecord();
                add();
            }
            addDataBtn.innerHTML = 'Edit Data';
        };
    });

}

add();

// ************************** Clear all input fild values ***************************
function clearInputValues() {
    age.value = "";
    address.value = "";
    email.value = "";
    name.value = "";

}



let jEsonData = localStorage.getItem("userData");
if (jEsonData) {
    data = JSON.parse(jEsonData);
    setTableData()
}




// *********************************** gsap animation popup display *****************************
function ifBlank() {
    popup.textContent = "Please fill out all fields before adding data."
    gsap.set("#popup", { y: 0, opacity: 1, scale: 1 });

    // Start the animation
    gsap.to("#popup", {
        y: 50,
        duration: 1,
        onComplete: function () {
            gsap.to("#popup", {
                opacity: 0,
                scale: 0,
                y: -50,
                delay: 1,
            });
        },
    });
}

function ifAddRecord() {
    popup.textContent = "Data add successfully!";
    gsap.set("#popup", { y: 0, opacity: 1, scale: 1 });

    // Start the animation
    gsap.to("#popup", {
        y: 50,
        duration: 1,
        onComplete: function () {
            gsap.to("#popup", {
                opacity: 0,
                scale: 0,
                y: -50,
                delay: 1,
            });
        },
    });
}

function ifDeleteRecord() {
    popup.textContent = "Data delete successfully!";
    gsap.set("#popup", { y: 0, opacity: 1, scale: 1 });

    // Start the animation
    gsap.to("#popup", {
        y: 50,
        duration: 1,
        onComplete: function () {
            gsap.to("#popup", {
                opacity: 0,
                scale: 0,
                y: -50,
                delay: 1,
            });
        },
    });
}


function ifEditRecord() {
    popup.textContent = "Data edit successfully!";
    gsap.set("#popup", { y: 0, opacity: 1, scale: 1 });

    // Start the animation
    gsap.to("#popup", {
        y: 50,
        duration: 1,
        onComplete: function () {
            gsap.to("#popup", {
                opacity: 0,
                scale: 0,
                y: -50,
                delay: 1,
            });
        },
    });
}
