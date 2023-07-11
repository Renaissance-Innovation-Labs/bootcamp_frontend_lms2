const users = sessionStorage.getItem('User');
let profile = JSON.parse(users);



const confirmPassInput = document.querySelector('.confirm-pass');
const toggleIcon = document.querySelector('.toggle-icon');

const togglePasswordVisibility = () => {
  if (confirmPassInput.type === 'password') {
    confirmPassInput.type = 'text';
    toggleIcon.classList.remove('fa-eye-slash');
    toggleIcon.classList.add('fa-eye');
  } else {
    confirmPassInput.type = 'password';
    toggleIcon.classList.remove('fa-eye');
    toggleIcon.classList.add('fa-eye-slash');
  }
};

toggleIcon.addEventListener('click', togglePasswordVisibility);


function profileData () {

fetch('https://lms-boo.onrender.com/users/user-detail', {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${profile.token}`
  }
})
.then(response => response.json())
.then(userProfile => {
  fetchUserData(userProfile);

  console.log(userProfile);

sessionStorage.setItem("userProfile", userProfile)
})
.catch(error => {
console.error("An error occurred", error);
});

}profileData ();

const firstName = document.querySelector('.first');
const lastName = document.querySelector('.last');
const phoneNumber = document.querySelector('.phone-no');

function fetchUserData(userProfile) {
  document.querySelector('.pro').textContent = `${userProfile.firstname} ${userProfile.lastname}`;
document.querySelector('.user').textContent = `${userProfile.firstname} ${userProfile.lastname}`;
document.querySelector('.mail').textContent = `${userProfile.email}`;

 firstName.value = userProfile.firstname;
 lastName.value = userProfile.lastname;
phoneNumber.value = userProfile.phone;
}




let userProfile = sessionStorage.getItem("userProfile");
console.log(userProfile);


const apiUrl = 'https://lms-boo.onrender.com/users';


function updateUser (){

const userData = {
  firstname:firstName.value,
  lastname: lastName.value,
  phone: phoneNumber.value,
};

fetch(apiUrl, {
  method: 'PATCH',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${profile.token}`
  },
  body: JSON.stringify(userData),
})
.then(response => response.json())
  .then(data => {
    alert("Profile updated successfully, kindly reload the page to effect changes");
    fetchUserData(userProfile);

    console.log('User profile updated successfully:', data);
  })
  .catch(error => {
    console.log('An error occurred: ' + error.message);
  });

}

document.querySelector('.form').addEventListener('submit', (event) => {
    event.preventDefault();

    updateUser ();
    profileData ();
});


document.querySelector('.form-pass').addEventListener('submit', (event) => {
  event.preventDefault();

  const newPassword = document.querySelector('.new-pass').value;
  const confirmPassword = document.querySelector('.confirm-pass').value;


  if (newPassword.length < 8 || newPassword !== confirmPassword) {
    displayErrorMessage('Password must be at least 8 characters long and match.');
    return;
  }


  showLoadingButton('.form-pass .changes');


  const payload = {
    new_password: newPassword,
    confirm_password: confirmPassword,
  };

  // Perform the API request
  fetch('https://lms-boo.onrender.com/login/change-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${profile.token}`
    },
    body: JSON.stringify(payload),
  })
    .then(response => {
      if (response.ok) {
        displaySuccessMessage('Information updated successfully.');
        // Reset the form if needed
        document.querySelector('.form-pass').reset();
      } else {
        throw new Error('Error updating user information.');
      }
    })
    .catch(error => {
      displayErrorMessage(error.message);
    })
    .finally(() => {
      setTimeout(() => {
        resetButton('.form-pass .changes', 'Change Password');
      }, 5000);
    });
});

function showLoadingButton(selector) {
  const button = document.querySelector(selector);
  button.textContent = 'Updating...';
  button.disabled = true;
}

function resetButton(selector, text) {
  const button = document.querySelector(selector);
  button.textContent = text;
  button.disabled = false;
}

function displayErrorMessage(message) {
  const errorMessage = document.querySelector('.error-message');
  errorMessage.textContent = message;
  errorMessage.style.display = 'block';

  setTimeout(() => {
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';
  }, 5000);
}

function displaySuccessMessage(message) {
  const successMessage = document.querySelector('.success-message');
  successMessage.textContent = message;
  successMessage.style.display = 'block';

  setTimeout(() => {
    successMessage.textContent = '';
    successMessage.style.display = 'Updated Successfully ';
  }, 5000);
}

document.getElementById('footericon4').addEventListener('click', function() {
  sessionStorage.clear();
  window.location.href = '../index.html';
});
