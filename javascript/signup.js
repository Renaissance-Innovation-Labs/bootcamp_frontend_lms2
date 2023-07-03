
const form = document.querySelector('#form');

const firstName = document.querySelector('.first-name');
const lastName = document.querySelector('.last-name');
const email = document.querySelector('.email');
const phoneNumber = document.querySelector('.phone-number');
const password = document.querySelector('.password');
const cpassword = document.querySelector('.cpassword');

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const createPayload = {
    firstname: firstName.value,
    lastname: lastName.value,
    email: email.value,
    password: password.value,
    phone: phoneNumber.value
  };

  if (password.value === cpassword.value) {
    fetch('https://lms-boo.onrender.com/users', {
      method: 'post',
      body: JSON.stringify(createPayload),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((res) => console.log({ res }))
      .catch((error) => console.log(error));
  } else {
    console.log('password must match');
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
