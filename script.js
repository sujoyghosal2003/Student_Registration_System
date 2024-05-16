document.addEventListener("DOMContentLoaded", function() {
    const registrationForm = document.getElementById("registrationForm");
    const studentList = document.getElementById("studentList");
    const emailList = []; // Array to store unique email addresses
    const studentIDList = []; // Array to store unique student IDs
    const contactNoList = []; // Array to store unique contact numbers

    registrationForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const studentName = document.getElementById("studentName").value.trim();
        const studentID = document.getElementById("studentID").value.trim();
        const email = document.getElementById("email").value.trim();
        const contactNo = document.getElementById("contactNo").value.trim();

        if (!studentName || !studentID || !email || !contactNo) {
            alert("Please fill in all fields.");
            return;
        }

        if (!isValidStudentName(studentName)) {
            alert("Please do not use unnecessary spaces in the student name.");
            return;
        }

        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (emailList.includes(email)) {
            alert("Email address already exists. Please use a different email.");
            return;
        }

        if (contactNoList.includes(contactNo)) {
            alert("Contact number already exists. Please provide a different contact number.");
            return;
        }

        addStudent(studentName, studentID, email, contactNo);
        emailList.push(email); // Add email to the list
        studentIDList.push(studentID); // Add student ID to the list
        contactNoList.push(contactNo); // Add contact number to the list
        registrationForm.reset();
    });

    function addStudent(studentName, studentID, email, contactNo) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${studentName}</td>
            <td>${studentID}</td>
            <td>${email}</td>
            <td>${contactNo}</td>
            <td>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;
        studentList.appendChild(row);

        // Add event listeners for edit and delete buttons
        const editButton = row.querySelector(".edit-btn");
        editButton.addEventListener("click", function() {
            editStudent(row);
        });

        const deleteButton = row.querySelector(".delete-btn");
        deleteButton.addEventListener("click", function() {
            deleteStudent(row);
        });
    }

    function editStudent(row) {
        const cells = row.querySelectorAll("td");

        const studentName = cells[0].textContent;
        const studentID = cells[1].textContent;
        const email = cells[2].textContent;
        const contactNo = cells[3].textContent;

        document.getElementById("studentName").value = studentName;
        document.getElementById("studentID").value = studentID;
        document.getElementById("email").value = email;
        document.getElementById("contactNo").value = contactNo;

        row.remove();
    }

    function deleteStudent(row) {
        row.remove();
    }

    function isValidStudentName(studentName) {
        const trimmedName = studentName.trim();
        if (trimmedName === "") {
            return false;
        }
        const words = trimmedName.split(" ");
        for (let word of words) {
            if (word === "") {
                return false; // Check for consecutive spaces
            }
        }
        return true;
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
