
const users = sessionStorage.getItem('User');
let profile = JSON.parse(users);
console.log(profile);
// make the profile name dynamic
    document.querySelector('.profile').textContent = `${profile.firstname} ${profile.lastname}`;
    document.querySelector('.user').textContent = `${profile.firstname} ${profile.lastname}`;
 document.querySelector('.mail').textContent = `${profile.email}`;

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

function handleSubmit(event) {
  event.preventDefault();

  const firstName = document.querySelector('.first');
  const lastName = document.querySelector('.last');
  const newPassword = document.querySelector('.new-pass');
  const confirmPassword = document.querySelector('.confirm-pass');

  const userData = {
    'firstName': firstName.value,
    'lastName': lastName.value,
    'newPassword': newPassword.value,
    'confirmPassword': confirmPassword.value,
  };

  fetch('https://lms-boo.onrender.com/users', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error updating user profile');
      }
    })
    .then(data => {
      console.log('User profile updated successfully:', data);
    })
    .catch(error => {
      console.log('An error occurred:', error);
    });
}

const form = document.querySelector('.form');
form.addEventListener('submit', handleSubmit);
// Get the form elements
const firstNameInput = document.querySelector('.first');
const lastNameInput = document.querySelector('.last');
const phoneNumberInput = document.querySelector('.phone-no');
const newPasswordInput = document.querySelector('.new-pass');
const confirmPasswordInput = document.querySelector('.confirm-pass');
const saveChangesButton = document.querySelector('.form .changes');
const changePasswordButton = document.querySelector('.form-pass .changes');

// Retrieve the profile details from session storage
const storedFirstName = sessionStorage.getItem('firstName');
const storedLastName = sessionStorage.getItem('lastName');
const storedPhoneNumber = sessionStorage.getItem('phoneNumber');

// Set the retrieved values in the input fields
firstNameInput.value = storedFirstName;
lastNameInput.value = storedLastName;
phoneNumberInput.value = storedPhoneNumber;

// Save profile changes
saveChangesButton.addEventListener('click', (event) => {
  event.preventDefault();

  // Get the updated profile values
  const updatedFirstName = firstNameInput.value;
  const updatedLastName = lastNameInput.value;
  const updatedPhoneNumber = phoneNumberInput.value;

  // Update the session storage with the new values
  sessionStorage.setItem('firstName', updatedFirstName);
  sessionStorage.setItem('lastName', updatedLastName);
  sessionStorage.setItem('phoneNumber', updatedPhoneNumber);

  // Perform any necessary API requests or further processing
});

// Change password
changePasswordButton.addEventListener('click', (event) => {
  event.preventDefault();

  // Get the new password values
  const newPassword = newPasswordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  // Validate the passwords
  if (newPassword.length < 8) {
    displayError('Password must be at least 8 characters long.');
    return;
  }

  if (!hasCapitalLetter(newPassword)) {
    displayError('Password must contain at least one capital letter.');
    return;
  }

  if (!hasSpecialCharacter(newPassword)) {
    displayError('Password must contain at least one special character.');
    return;
  }

  if (newPassword !== confirmPassword) {
    displayError('Passwords do not match.');
    return;
  }

  // Passwords are valid, perform any necessary API requests or further processing
});

// Display error message on the UI
function displayError(message) {
  const errorMessage = document.createElement('p');
  errorMessage.classList.add('error-message');
  errorMessage.textContent = message;

  const formContainer = document.querySelector('.information');
  formContainer.appendChild(errorMessage);
}

// Check if a string contains at least one capital letter
function hasCapitalLetter(str) {
  return /[A-Z]/.test(str);
}

// Check if a string contains at least one special character
function hasSpecialCharacter(str) {
  return /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(str);
}


