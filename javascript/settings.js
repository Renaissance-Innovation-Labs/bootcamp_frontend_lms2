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

  fetch('https://lms-boo.onrender.com/users/UpdateUser', {
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
