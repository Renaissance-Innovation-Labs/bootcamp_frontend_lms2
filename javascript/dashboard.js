const users = sessionStorage.getItem('User');
let profile = JSON.parse(users);

// Make the profile name dynamic
document.querySelector('.pro').textContent = `${profile.firstname} ${profile.lastname}`;
document.querySelector('.hello').textContent = `Hello ${profile.firstname} ${profile.lastname}`;

// Fetch assignments from the API
fetch("https://lms-boo.onrender.com/stack/assignment", {
    headers: {Authorization: `Bearer ${profile.token}`}
  })
    .then(response => response.json())
    .then(data => {
      // Save the response to session storage
      sessionStorage.setItem("assignments", JSON.stringify(data));
      // Display the assignments on the HTML page
      displayAssignments(data);
    })
    .catch(error => {
      console.error("Error fetching assignments:", error);
    });
    // date: "23/06"
    // name: "Developing Restaurant Apis"
    // stack: "Backend"
    // time: "08:00 AM"
  // Function to display the assignments on the HTML page
  function displayAssignments(assignments) {
    const assignmentSection = document.querySelector(".announceassign");
    // Iterate over each assignment
    assignments.forEach(assignment => {
      // Create a <div> element for the assignment
      const assignmentDiv = document.createElement("div");
      assignmentDiv.classList.add("assignmentscon");
      const assignHead = document.createElement("p");
      assignHead.classList.add("assignments");
      assignHead.textContent = "Assignments";
      // Create a <h3> element for the assignment title
      const assignmentTitle = document.createElement("p");
      assignmentTitle.innerHTML = `<img src="../assets/dashboardassets/Document.png" alt="icon">${assignment.name}`;
      assignmentTitle.classList.add("assignmentsbig");
      const assignmentDetails = document.createElement("p");
      assignmentDetails.innerHTML = `${assignment.stack}  <span class="time">${assignment.time} - ${assignment.date}</span>`;
      assignmentDetails.classList.add("assignmentssmall")
      // Append the assignment title and details to the assignment div
      assignmentDiv.appendChild(assignHead);
      assignmentDiv.appendChild(assignmentTitle);
      assignmentDiv.appendChild(assignmentDetails);
      // Append the assignment div to the assignment section
      assignmentSection.appendChild(assignmentDiv);
    });
  }