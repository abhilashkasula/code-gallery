const swap = function(elem1, elem2) {
  document.querySelector(`#${elem1}`).classList.remove('hide-display');
  document.querySelector(`#${elem2}`).classList.add('hide-display');
}

const showErr = function({isValidUser, dest}, id) {
  if(isValidUser) {
    return location.replace(dest);
  }
  document.querySelector(`#${id}`).classList.remove('hide');
  setTimeout(() => document.querySelector(`#${id}`).classList.add('hide'), 3000);
};

const login = function() {
  const username = document.querySelector('#login-username').value.trim();
  const password = document.querySelector('#login-password').value.trim();
  if(!username || !password) return;
  
  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username, password})
  };
  fetch('/login', options)
    .then(res => res.json())
    .then(res => showErr(res, 'incorrectUP'));
};

const signup = function() {
};

const addListeners = function() {
  const loginButton = document.querySelector('#login');
  const signupButton = document.querySelector('#signup');
  loginButton.addEventListener('click', login);
  signupButton.addEventListener('click', signup);
};

const main = function() {
  addListeners();
}

window.onload = main;
