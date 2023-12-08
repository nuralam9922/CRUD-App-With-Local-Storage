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
            "name": name.value.charAt(0).toUpperCase() + name.value.slice(1).trim(),
            "age": age.value.trim(),
            "address": address.value.trim(),
            "email": email.value.trim()
        };

        // Handle validation error (invalid characters in the name)
        if (!/^[A-Za-z\s]+$/.test(name.value)) {
            popup.textContent = "Please enter a valid name using only letters and spaces.";
            showPopup();
            name.focus();
        }


        // age must have 2 digit number 
        else if (age.value.length !== 2) {
            popup.textContent = "Please enter a two-digit number for age.";
            showPopup();
            age.focus(); // set autoFocaus when any condition is true -----------------------
        }


        // Handle validation error (empty fields)
        else if (address.value.length <= 5) {
            popup.textContent = "Please fill out address field before adding data.";
            console.log(address.value.length)
            showPopup();
            address.focus(); // set autoFocaus when any condition is true -----------------------
        }


        // Handle validation error (email does not end with "@gmail.com")
        else if (!email.value.endsWith("@gmail.com")) {
            popup.textContent = "Please enter a valid email address ending with @gmail.com.";
            showPopup();
            email.focus(); // set autoFocaus when any condition is true -----------------------
        }


        else {
            data.push(newData);
            localStorage.setItem("userData", JSON.stringify(data));
            setTableData();
            clearInputValues();
            // ******** if data add successfully! then call call showPopup() function to popup or alart
            document.getElementById("popup").style.backgroundColor = "#1c8551";
            popup.textContent = "Data add successfully!";
            showPopup(); // set autoFocaus when any condition is true -----------------------
        };

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
            popup.textContent = "Data delete successfully!";
            showPopup();
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
          
            addDataBtn.onclick = function () {
                data[dataIndex].name = name.value;
                data[dataIndex].age = age.value;
                data[dataIndex].address = address.value;
                data[dataIndex].email = email.value;
                if (!/^[A-Za-z\s]+$/.test(name.value)) {
                    popup.textContent = "Please enter a valid name using only letters and spaces.";
                    showPopup();
                    name.focus();
                }


                // age must have 2 digit number 
                else if (age.value.length !== 2) {
                    popup.textContent = "Please enter a two-digit number for age.";
                    showPopup();
                    age.focus(); // set autoFocaus when any condition is true -----------------------
                }


                // Handle validation error (empty fields)
                else if (address.value.length <= 5) {
                    popup.textContent = "Please fill out address field before adding data.";
                    console.log(address.value.length)
                    showPopup();
                    address.focus(); // set autoFocaus when any condition is true -----------------------
                }


                // Handle validation error (email does not end with "@gmail.com")
                else if (!email.value.endsWith("@gmail.com")) {
                    popup.textContent = "Please enter a valid email address ending with @gmail.com.";
                    showPopup();
                    email.focus(); // set autoFocaus when any condition is true -----------------------
                }


                else {
                    localStorage.setItem("userData", JSON.stringify(data));
                    setTableData();
                    clearInputValues();
                    addDataBtn.innerHTML = 'Add Data';
                    popup.textContent = "Data edit successfully!";
                    showPopup();
                    add();
                };



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
function showPopup() {

    gsap.set("#popup", { y: 0, opacity: 1, scale: 1 });

    // Start the animation
    gsap.to("#popup", {
        y: 60,
        duration: 1,
        onComplete: function () {
            gsap.to("#popup", {
                opacity: 0,
                scale: 0,
                y: -50,
                delay: 2,
            });
        },
    });
}


// *********************************** search Data my name ***********
let searchBox = document.getElementById("search");
let searchBnutton = document.getElementById("searchBnutton");
searchBox.onmouseenter = function () {
    searchBox.style.width = "70%";
    searchBnutton.style.transform = "rotate(360deg)";

}
searchBnutton.onmouseenter = function () {
    searchBox.style.width = "70%";
    searchBnutton.style.transform = "rotate(360deg)";

}
searchBox.onmouseleave = function () {
    searchBox.style.width = "50%";
    searchBnutton.style.transform = "rotate(0deg)";
}
searchBnutton.onclick = function () {
    const searchValue = searchBox.value.toLowerCase(); // Convert search value to lowercase for case-insensitive comparison

    data.forEach((el, i) => {
        if (el.name.toLowerCase() === searchValue) {
                table.innerHTML = `
            <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Address</th>
                <th>Email</th>
                <th>Actions</th>
            </tr>`;


                table.innerHTML += `<tr>
                    <td>${el.name}</td>
                    <td>${el.age}</td>
                    <td>${el.address}</td>
                    <td>${el.email}</td>
                    <td class="deleteAndEdit"><p class="Delete">Delete</p><p class="Edit">Edit</p></td>
                </tr>`;

                edit();
                deleteRecord();
        } else {
            table.innerHTML = `NOT FOUND `
        }
    });

    searchBox.value = ""; 
};





// menu 

let menu = document.getElementById("menu");
menu.onclick = function () {
    document.getElementById("menu-overlay").style.right = "0";
}

document.getElementById("menu-overlay-close").onclick = function () {
    document.getElementById("menu-overlay").style.right = "-50%";
}