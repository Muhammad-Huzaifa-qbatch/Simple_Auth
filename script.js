const loginTab = document.getElementById('login-tab');
const signupTab = document.getElementById('signup-tab');
const loginPanel = document.getElementById('login-panel');
const signupPanel = document.getElementById('signup-panel');
const tabIndicator = document.querySelector('.tab-indicator');

function switchTab(targetTab, targetPanel){
  //Update tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn=> {
    btn.classList.remove('active');
    btn.setAttribute('aria-selected', 'false');
  });
  targetTab.classList.add('active');
  targetTab.setAttribute('aria-selected','true');

  // Update panels
  document.querySelectorAll('.form-panel').forEach(panel => {
    panel.classList.remove('active');
  });
  targetPanel.classList.add('active');

  // Update Indicator
  if(targetTab === signupTab){
    tabIndicator.classList.add('signup')
  } else {
    tabIndicator.classList.remove('signup');
  }
}


loginTab.addEventListener('click', () => switchTab(loginTab, loginPanel));
signupTab.addEventListener('click', () => switchTab(signupTab, signupPanel));


function validateField(field, errorElement, validator) {
  const isValid = validator(field.value);
  const group = field.closest('.form-group') || field.closest('.floating-label');
        
  if (isValid) {
    group?.classList.remove('error');
    errorElement.style.display = 'none';
  } else {
    group?.classList.add('error');
    errorElement.style.display = 'block';
  }
  return isValid;
}

// Email validation
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Password validation
function isValidPassword(password) {
  return password.length >= 8 && 
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
}


// Login Form Handling
const loginForm = document.getElementById('login-form');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');

loginEmail.addEventListener('blur', () => {
  validateField(loginEmail, document.getElementById('login-email-error'), isValidEmail);
});

loginPassword.addEventListener('blur', () => {
  validateField(loginPassword, document.getElementById('login-password-error'), 
    password => password.length >= 6);
});

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const emailValid = validateField(loginEmail, document.getElementById('login-email-error'), isValidEmail);
  const passwordValid = validateField(loginPassword, document.getElementById('login-password-error'), 
    password => password.length >= 6);
        
  if (emailValid && passwordValid) {
      document.getElementById('login-success').classList.add('show');
      setTimeout(() => document.getElementById('login-success').classList.remove('show'), 3000);
    }
});

// Signup Form Handling
const signupForm = document.getElementById('signup-form');
const signupName = document.getElementById('signup-name');
const signupEmail = document.getElementById('signup-email');
const signupPassword = document.getElementById('signup-password');
const confirmPassword = document.getElementById('confirm-password');
const signupRole = document.getElementById('signup-role');

signupEmail.addEventListener('blur', () => {
validateField(signupEmail, document.getElementById('signup-email-error'), isValidEmail);
});

signupPassword.addEventListener('blur', () => {
validateField(signupPassword, document.getElementById('signup-password-error'), isValidPassword);
});

confirmPassword.addEventListener('blur', () => {
validateField(confirmPassword, document.getElementById('confirm-password-error'), 
  password => password === signupPassword.value);
});


signupForm.addEventListener('submit', (e) => {
e.preventDefault();
        
const nameValid = validateField(signupName, document.getElementById('signup-name-error'), 
  name => name.length >= 2);
const emailValid = validateField(signupEmail, document.getElementById('signup-email-error'), isValidEmail);
const passwordValid = validateField(signupPassword, document.getElementById('signup-password-error'), isValidPassword);
const confirmValid = validateField(confirmPassword, document.getElementById('confirm-password-error'), password => password === signupPassword.value);
const roleValid = validateField(signupRole, document.getElementById('signup-role-error'), role => role !== '');
        
if (nameValid && emailValid && passwordValid && confirmValid && roleValid) {
  document.getElementById('signup-success').classList.add('show');
  setTimeout(() => document.getElementById('signup-success').classList.remove('show'), 3000);
}
});

// Real-time password confirmation
confirmPassword.addEventListener('input', () => {
  validateField(confirmPassword, document.getElementById('confirm-password-error'), 
  password => password === signupPassword.value);
});


// Keyboard navigation for tabs
document.addEventListener('keydown', (e) => {
if (e.key === 'Tab' && e.target.classList.contains('tab-btn')) {
  e.preventDefault();
  const currentTab = e.target;
  const nextTab = currentTab === loginTab ? signupTab : loginTab;
  const nextPanel = currentTab === loginTab ? signupPanel : loginPanel;
  switchTab(nextTab, nextPanel);
  nextTab.focus();
}
});
