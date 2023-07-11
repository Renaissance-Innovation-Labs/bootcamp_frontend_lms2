const users = sessionStorage.getItem('User');
let profile = JSON.parse(users);
console.log(profile);
document.querySelector('.userr').textContent = `${profile.firstname} ${profile.lastname}`;

fetch("https://lms-boo.onrender.com/stack/assignment", {
    headers: {Authorization: `Bearer ${profile.token}`}
  })
    .then(response => response.json())
    .then(data => {
     
      sessionStorage.setItem("assignments", JSON.stringify(data));
      displayAssignments(data);
    })
    .catch(error => {
      console.error("Error fetching assignments:", error);
    });
   
  function displayAssignments(assignments) {
    const assignmentSection = document.querySelector(".assignup");
    assignments.forEach(assignment => {
      const assignmentDiv = document.createElement("div");
      assignmentDiv.classList.add("assignmentscon");
      const assignHead = document.createElement("p");
      assignHead.classList.add("assignments");
      assignHead.textContent = "Assignments";
      const assignmentTitle = document.createElement("p");
      assignmentTitle.innerHTML = `<img src="../assets/dashboardassets/Document.png" alt="icon">${assignment.name}`;
      assignmentTitle.classList.add("assignmentsbig");
      const assignmentDetails = document.createElement("p");
      assignmentDetails.innerHTML = `${assignment.stack}  <span class="time">${assignment.time} - ${assignment.date}</span>`;
      assignmentDetails.classList.add("assignmentssmall")
      assignmentDiv.appendChild(assignHead);
      assignmentDiv.appendChild(assignmentTitle);
      assignmentDiv.appendChild(assignmentDetails);
      assignmentSection.appendChild(assignmentDiv);
    });
  }