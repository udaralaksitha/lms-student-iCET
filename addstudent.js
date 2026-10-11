function getStudents() {
  return JSON.parse(localStorage.getItem("lmsStudents")) || [];
}

function saveStudents(students) {
  localStorage.setItem("lmsStudents", JSON.stringify(students));
}

function renderStudents() {
  const tbody = document.getElementById("studentTableBody");
  const students = getStudents();

  tbody.replaceChildren();

  students.forEach((student) => {
    const row = document.createElement("tr");

    [student.id, student.name, student.email, student.course].forEach(
      (value) => {
        const cell = document.createElement("td");
        cell.textContent = value;
        row.appendChild(cell);
      },
    );

    tbody.appendChild(row);
  });
}

document
  .getElementById("addStudentForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const student = {
      id: document.getElementById("addId").value.trim(),
      name: document.getElementById("addName").value.trim(),
      email: document.getElementById("addEmail").value.trim(),
      course: document.getElementById("addCourse").value.trim(),
    };

    const students = getStudents();
    const message = document.getElementById("addMessage");

    if (students.some((s) => s.id.toLowerCase() === student.id.toLowerCase())) {
      message.textContent = "Student ID already exists.";
      message.className = "message error";
      return;
    }

    students.push(student);
    saveStudents(students);
    renderStudents();

    message.textContent = "Student added successfully!";
    message.className = "message success";

    this.reset();
  });

document
  .getElementById("refreshStudents")
  .addEventListener("click", renderStudents);

renderStudents();
