const form = document.querySelector('#form');
const firstName = document.querySelector('.first-name');
const lastName = document.querySelector('.last-name');
const email = document.querySelector('.email');
const phoneNumber = document.querySelector('.phone-number');
const password = document.querySelector('.password');
const cpassword = document.querySelector('.cpassword');
const button = document.querySelector('button');
const checkbox = document.querySelector('.checkbox-input');

form.addEventListener("submit", function(event) {
  event.preventDefault();
  button.textContent = 'Creating Account...';

  const createPayload = {
    firstname: firstName.value,
    lastname: lastName.value,
    email: email.value,
    password: password.value,
    phone: phoneNumber.value
  };

  if (password.value !== cpassword.value) {
    alert('Passwords do not match.');
    button.textContent = 'Sign Up';
    return;
  } else if (password.value.length < 8) {
    alert('Password should be at least 8 characters long.');
    button.textContent = 'Sign Up';
    return;
  } else if (phoneNumber.value.length !== 11) {
    alert('Phone number should be 11 digits long.');
    button.textContent = 'Sign Up';
    return;
  } else if (!checkbox.checked) {
    alert('Please agree to the terms and conditions.');
    button.textContent = 'Sign Up';
    return;
  } else {
    fetch('https://lms-boo.onrender.com/users', {
      method: 'post',
      body: JSON.stringify(createPayload),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((res) => {
        button.textContent = 'Sign Up';
        window.location.href = '/index.html'; 
      })
      .catch((error) => {
        alert('Sign up unsuccessful! Please try again.');
        button.textContent = 'Sign Up';
      });
  }
});

const togglePasswordIcons = document.querySelectorAll('.toggle-password');
const passwordInputs = document.querySelectorAll('input[type="password"]');

const togglePasswordVisibility = (event) => {
  const icon = event.target;
  const input = event.target.parentNode.previousElementSibling;

  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
  } else {
    input.type = 'password';
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
  }
};
togglePasswordIcons.forEach((icon) => {
  icon.addEventListener('click', togglePasswordVisibility);
});