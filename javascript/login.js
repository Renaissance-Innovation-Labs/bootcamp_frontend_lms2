const loginForm = document.querySelector('.form');
const loginEmail = document.querySelector('.email');
const loginPassword = document.querySelector('.password-field');
const button = document.querySelector('.button');

loginForm.addEventListener('submit', function(event) {
  event.preventDefault();
  button.textContent = 'Loading...';

  const loginPayload = {
    email: loginEmail.value,
    password: loginPassword.value
  };

  console.log({ loginPayload });

  if (loginPassword.value !== '' && loginEmail.value !== '') {
    fetch('https://lms-boo.onrender.com/login', {
      method: 'post',
      body: JSON.stringify(loginPayload),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then(data => {
      console.log('Login successful', data);
      const user = {
        "access_token": data.access_token,
        "token_type": data.token_type,
        "user": {
          "firstname": data.user.firstname,
          "lastname": data.user.lastname,
          "email": data.user.email,
          "phone": data.user.phone,
          "id": data.user.id,
        }
      };
      sessionStorage.setItem('payload', JSON.stringify(user));
      window.location.href = '../pages/dashboard.html';
    })
    .catch((error) => {
      console.log(error);
      alert('Login unsuccessful!, please enter the correct username and password');
      button.textContent = 'Log In';
    });
  } else {
    console.log('Please enter both email and password.');
    alert('please enter the correct username and password')
    button.textContent = 'Log In'
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
