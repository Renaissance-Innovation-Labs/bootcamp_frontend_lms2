const users = sessionStorage.getItem('User');
let profile = JSON.parse(users);

// Make the profile name dynamic
document.querySelector('.pro').textContent = `${profile.firstname} ${profile.lastname}`;
document.querySelector('.hello').textContent = `Hello ${profile.firstname} ${profile.lastname}`;


function courseDisplay() {

fetch(`https://lms-boo.onrender.com/stack/course/`, {
  method: "GET",
  headers: {Authorization: `Bearer ${profile.token}`}
})
.then(response => response.json())
.then(courses => {
 

  sessionStorage.setItem("courses", courses)
displayCourses (courses);
})
.catch(error => {
console.error("Error fetching course:", error);
});
};
courseDisplay();

function displayCourses(courses) {

  let element = document.querySelector('.overviewvaluesmain');
  element.textContent = courses.length;

}


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

  function displayAssignments(assignments) {
    const assignmentSection = document.querySelector(".announceassign");
    
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