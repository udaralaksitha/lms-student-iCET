document
  .getElementById("updateStudentForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const id = document.getElementById("updateId").value.trim();
    const name = document.getElementById("updateName").value.trim();
    const email = document.getElementById("updateEmail").value.trim();
    const course = document.getElementById("updateCourse").value.trim();
    const message = document.getElementById("updateMessage");

    const students = JSON.parse(localStorage.getItem("lmsStudents")) || [];

    const student = students.find(
      (s) => s.id.toLowerCase() === id.toLowerCase(),
    );

    if (!student) {
      message.textContent = "Student not found.";
      message.className = "message error";
      return;
    }

    student.name = name;
    student.email = email;
    student.course = course;

    localStorage.setItem("lmsStudents", JSON.stringify(students));

    message.textContent = "Student updated successfully!";
    message.className = "message success";

    document.getElementById("addStudentForm").dispatchEvent(new Event("reset"));

    const tbody = document.getElementById("studentTableBody");
    tbody.replaceChildren();

    students.forEach((s) => {
      const row = document.createElement("tr");

      [s.id, s.name, s.email, s.course].forEach((value) => {
        const cell = document.createElement("td");
        cell.textContent = value;
        row.appendChild(cell);
      });

      tbody.appendChild(row);
    });
  });
