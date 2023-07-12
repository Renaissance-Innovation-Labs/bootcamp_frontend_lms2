const users = sessionStorage.getItem('User');
let profile = JSON.parse(users);
console.log(profile);
document.querySelector('.userr').textContent = `${profile.firstname} ${profile.lastname}`;

document.getElementById('logout').addEventListener('click', function() {
  sessionStorage.clear();
   window.location.href = 'index.html';
 });

// fetch("https://lms-boo.onrender.com/stack/assignment", {
//     headers: {Authorization: `Bearer ${profile.token}`}
//   })

//     .then(response => response.json())
//     .then(data => {
//       sessionStorage.setItem("assignment", JSON.stringify(data));
//       displayAssignment(data);
//     })

//     .catch(error => {
//       console.error("Error fetching assignments:", error);
//     });
   
//   function displayAssignment(assignment) {
//     const assignmentSection = document.querySelector(".assignup");
//     assignment.forEach(assignment => {
//       const assignmentDiv = document.createElement("div");
//       assignmentDiv.classList.add("assignmentcon");
//       const assignHead = document.createElement("p");
//       assignHead.classList.add("assignment");
//       assignHead.textContent = "Assignment";
//       const assignmentTitle = document.createElement("p");
//       assignmentTitle.innerHTML = `<img src="../assets/coursemgtassets/Document.png" alt="icon">${assignment.name}`;
//       assignmentTitle.classList.add("assignmentbig");
//       const assignmentDetails = document.createElement("p");
//       assignmentDetails.innerHTML = `${assignment.stack}  <span class="time">${assignment.time} - ${assignment.date}</span>`;
//       assignmentDetails.classList.add("assignmentsmall")
//       assignmentDiv.appendChild(assignHead);
//       assignmentDiv.appendChild(assignmentTitle);
//       assignmentDiv.appendChild(assignmentDetails);
//       assignmentSection.appendChild(assignmentDiv);
//     });
//   }