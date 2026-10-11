document
  .getElementById("deleteStudentForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const id = document.getElementById("deleteId").value.trim();
    const message = document.getElementById("deleteMessage");

    const students = JSON.parse(localStorage.getItem("lmsStudents")) || [];

    const student = students.find(
      (s) => s.id.toLowerCase() === id.toLowerCase(),
    );

    if (!student) {
      message.textContent = "Student not found.";
      message.className = "message error";
      return;
    }

    if (!confirm("Delete student " + student.name + "?")) {
      return;
    }

    const updatedStudents = students.filter(
      (s) => s.id.toLowerCase() !== id.toLowerCase(),
    );

    localStorage.setItem("lmsStudents", JSON.stringify(updatedStudents));

    message.textContent = "Student deleted successfully!";
    message.className = "message success";

    const tbody = document.getElementById("studentTableBody");
    tbody.replaceChildren();

    updatedStudents.forEach((s) => {
      const row = document.createElement("tr");

      [s.id, s.name, s.email, s.course].forEach((value) => {
        const cell = document.createElement("td");
        cell.textContent = value;
        row.appendChild(cell);
      });

      tbody.appendChild(row);
    });

    this.reset();
  });
