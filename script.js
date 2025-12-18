// Tabs
const studentTab = document.getElementById("studentTab");
const adminTab = document.getElementById("adminTab");
const studentView = document.getElementById("studentView");
const adminView = document.getElementById("adminView");

// Set admin password
const ADMIN_PASSWORD = "admin123"; // Change your password here

// Switch to Student View
studentTab.addEventListener("click", () => {
  studentTab.classList.add("active");
  adminTab.classList.remove("active");

  studentView.classList.add("active");
  adminView.classList.remove("active");
});

// Switch to Admin View with password
adminTab.addEventListener("click", () => {
  const pass = prompt("Enter Admin Password:");
  if (pass === ADMIN_PASSWORD) {
    adminTab.classList.add("active");
    studentTab.classList.remove("active");

    adminView.classList.add("active");
    studentView.classList.remove("active");
  } else {
    alert("Incorrect password!");
  }
});

// Data storage
let reservations = JSON.parse(localStorage.getItem("reservations")) || [];

// Form submit
const form = document.getElementById("reservationForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const data = {
    name: document.getElementById("studentName").value,
    id: document.getElementById("studentId").value,
    department: document.getElementById("department").value,
    semester: document.getElementById("semester").value,
    book: document.getElementById("bookTitle").value,
    status: "Pending",
  };

  reservations.push(data);
  localStorage.setItem("reservations", JSON.stringify(reservations));

  form.reset();
  loadTables();
});

// Load student and admin tables
function loadTables() {
  const studentBody = document.querySelector("#studentTable tbody");
  const adminBody = document.querySelector("#adminTable tbody");

  studentBody.innerHTML = "";
  adminBody.innerHTML = "";

  reservations.forEach((r, index) => {
    // Student Table
    studentBody.innerHTML += `
      <tr>
        <td>${r.book}</td>
        <td class="status-${r.status.toLowerCase()}">${r.status}</td>
      </tr>
    `;

    // Admin Table
    adminBody.innerHTML += `
      <tr>
        <td>${r.name}</td>
        <td>${r.id}</td>
        <td>${r.department}</td>
        <td>${r.semester}</td>
        <td>${r.book}</td>
        <td class="status-${r.status.toLowerCase()}">${r.status}</td>
        <td>
          <button class="admin-btn approve" onclick="approve(${index})">Approve</button>
          <button class="admin-btn reject" onclick="reject(${index})">Reject</button>
        </td>
      </tr>
    `;
  });
}

// Admin actions
function approve(index) {
  reservations[index].status = "Approved";
  localStorage.setItem("reservations", JSON.stringify(reservations));
  loadTables();
}

function reject(index) {
  reservations[index].status = "Rejected";
  localStorage.setItem("reservations", JSON.stringify(reservations));
  loadTables();
}

// Clear all data
function clearAll() {
  if (confirm("Are you sure you want to clear all reservations?")) {
    reservations = [];
    localStorage.removeItem("reservations");
    loadTables();
  }
}

// Initial load
loadTables();