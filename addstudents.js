let students = [];

function addStudent() {

    const name =
        document.getElementById("studentName").value;

    if (name === "") return;

    students.push(name);

    displayStudents();
}

function displayStudents() {

    const list =
        document.getElementById("studentList");

    list.innerHTML = "";

    students.forEach(student => {

        list.innerHTML += `
            <li>${student}</li>
        `;
    });
}