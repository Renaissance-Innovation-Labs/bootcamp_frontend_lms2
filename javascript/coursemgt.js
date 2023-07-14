const users = sessionStorage.getItem('User');
let profile = JSON.parse(users);
console.log(profile);
document.querySelector('.userr').textContent = `${profile.firstname} ${profile.lastname}`;
document.getElementById('logout').addEventListener('click', function() {
  sessionStorage.clear();
   window.location.href = 'index.html';
 });

fetch("https://lms-boo.onrender.com/stack/assignment", {
    headers: {Authorization: `Bearer ${profile.token}`}
  })
    .then(response => response.json())
    .then(res => {
      sessionStorage.setItem("assignment", JSON.stringify(res));
      displayAssignment(res);
    })
    .catch(error => {
      console.error("Error fetching assignments:", error);
    });
   
  function displayAssignment(assignment) {
    const assignmentSection = document.querySelector(".assigncon");
    assignment.forEach(assignment => {
      const assignmentTitle = document.createElement("p");
      assignmentTitle.innerHTML = `<img src="../assets/coursemgtassets/Document.png" class="doc"/>${assignment.name}`;
      assignmentTitle.classList.add("assignmentbig");
      const assignmentDetails = document.createElement("p");
      assignmentDetails.innerHTML = `${assignment.stack}  <span class="time">${assignment.time} - ${assignment.date}</span>`;
      assignmentDetails.classList.add("assignmentsmall")
      assignmentSection.appendChild(assignmentTitle);
      assignmentSection.appendChild(assignmentDetails);
    });
  }

  let loadState = document.querySelector(".load")

  function getAllStack() {
    // loadState.textContent = 'Hold on...'
    // loadState.style.position = 'absolute'
    // loadState.style.top = '265px'
  fetch("https://lms-boo.onrender.com/stack/")
  .then(response => response.json())
  .then(res => {
    sessionStorage.setItem("stacks", JSON.stringify(res));
    appendStack(res);
    loadState.textContent = '';
  })
  .catch(error => {
  console.error("Error fetching course stacks:", error);
  loadState.textContent = '';
  });
  }

  function appendStack(stacks) {
  stacks.forEach(stack => {
    const stackContainer = document.querySelector(".stack");
      const stackDiv = document.createElement("div");

      stackDiv.classList.add("stack-div");
      const stackLabel = document.createElement("label");
      stackLabel.textContent = stack.name;
      stackLabel.id = "tim"

      stackLabel.classList.add("stack");
      const stackSelect = document.createElement("select");
      stackSelect.name = stack.name.toLowerCase();
      stackSelect.id = stack.id;
      const courseOpt = document.createElement("option");
      courseOpt.value = 0;
      courseOpt.textContent = "Choose";
      stackSelect.appendChild(courseOpt);
      stack.courses.forEach(course => {
      const courseOption = document.createElement("option");
      courseOption.value = course.course_code;
      courseOption.textContent = course.title;
        stackSelect.appendChild(courseOption);
      });

      stackContainer.appendChild(stackDiv);
      stackDiv.appendChild(stackLabel);
      stackDiv.appendChild(stackSelect);
        stackSelect.addEventListener("change", courseAdding);
    });
  }getAllStack();

  function courseAdding(event) {
    const courseCode = event.target.value;
    let courseAdd = document.querySelector(".add-course");
    // courseAdd.textContent = 'Adding...'
    // courseAdd.style.position = 'absolute'
    // courseAdd.style.top = '245px'
    // console.log(courseCode);
    fetch(`https://lms-boo.onrender.com/stack/course/${courseCode}`, {
      method: "POST",
      headers: {Authorization: `Bearer ${profile.token}`}
    })
      .then(response => response.json())
      .then(course => {
        courseDisplay()
        courseAdd.textContent = '';
      sessionStorage.setItem("course", course)
      location.reload();
      })
      .catch(error => {
        console.error("Error fetching course:", error);
        courseAdd.textContent = '';
      });
  }

  function courseDisplay() {
    let load =  document.querySelector(".load-course");
    load.textContent = "Loading Courses...";
  fetch(`https://lms-boo.onrender.com/stack/course/`, {
    method: "GET",
    headers: {Authorization: `Bearer ${profile.token}`}
  })
  .then(response => response.json())
  .then(courses => {
    load.textContent = "";
    console.log(courses)

    sessionStorage.setItem("courses", courses)
    appendCourses(courses);
  courseCount (courses);
  })
  .catch(error => {
  console.error("Error fetching course:", error);
  });
  };
  courseDisplay();

  function appendCourses(courses) {
  const courseSection = document.querySelector(".mycon");
  courses.forEach(course => {
  const courseDiv = document.createElement("div");

  courseDiv.classList.add("mgtback");
  const courseTitle = document.createElement("h6");
  courseTitle.textContent = course.stack;

  courseTitle.classList.add("management");
  const assessDiv = document.createElement("div");

  assessDiv.classList.add("assess");
  const coursesDiv = document.createElement("div");

  coursesDiv.classList.add("promgtcon");
  const courseName = document.createElement("p");
  courseName.textContent = course.title;

  courseName.classList.add("p");
  const courseProgress = document.createElement("p");
  courseProgress.textContent = `Progress: 45%`;

  courseDiv.classList.add("pr");
  const courseInstructor = document.createElement("p");
  courseInstructor.textContent = `Instructor: Simon Carrel`;
  const btnDiv = document.createElement("div");

  btnDiv.classList.add("condel");
  const contBtn = document.createElement("button");
  contBtn.textContent = `Continue`;

  contBtn.classList.add("continue");
  const delBtn = document.createElement("button");
  delBtn.textContent = `Delete`;

  delBtn.classList.add("delete");
  delBtn.addEventListener("click", () => {
    delBtn.textContent = `Deleting`;
    deleteCourse(course.course_code);
  });

  courseDiv.appendChild(courseTitle);
  courseDiv.appendChild(assessDiv);
  assessDiv.appendChild(coursesDiv);
  coursesDiv.appendChild(courseName);
  coursesDiv.appendChild(courseProgress);
  coursesDiv.appendChild(courseInstructor);
  assessDiv.appendChild(btnDiv);
  btnDiv.appendChild(contBtn);
  btnDiv.appendChild(delBtn);
  courseSection.appendChild(courseDiv);
  })
  courseCount (courses);
  }
 
  function courseCount (courses) {
    const count = document.querySelector(".my span");
    count.textContent = `(${courses.length})`;
  }

  function deleteCourse(courseCode) {
    fetch(`https://lms-boo.onrender.com/stack/course/${courseCode}`, {
      method: "DELETE",
      headers: {Authorization: `Bearer ${profile.token}`}
    })
      .then(response => response.json())
      .then(courses => {
        courseDisplay()
        console.log("Course deleted:",courses);
        location.reload();
      })
      .catch(error => {
        console.error("Error deleting course:", error);
      });
  }
  