

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
