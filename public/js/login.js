const swap = function(elem1, elem2) {
  document.querySelector(`#${elem1}`).classList.remove('hide-display');
  document.querySelector(`#${elem2}`).classList.add('hide-display');
}

const showErr = function({isValidUser}, id) {
  if(isValidUser) {
    return location.reload();
  }
  document.querySelector(`#${id}`).classList.remove('hide');
  setTimeout(() => document.querySelector(`#${id}`).classList.add('hide'), 3000);
};

const getOptions = function(body) {
  return {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  }
}

const login = function() {
  const username = document.querySelector('#login-username').value.trim();
  const password = document.querySelector('#login-password').value.trim();
  if(!username || !password) return;

  fetch('/login', getOptions({username, password}))
    .then(res => res.json())
    .then(res => showErr(res, 'incorrectUP'));
};

const signup = function() {
  const username = document.querySelector('#signup-username').value.trim();
  const password = document.querySelector('#signup-password').value.trim();
  const confirm = document.querySelector('#signup-confirm').value.trim();
  if(!username || !password) return;
  if(password.length < 8) return showErr({isValidUser: false}, 'length-err');
  if(!username.match(/^[a-zA-Z0-9_]+$/)) {
    const isValidUser = false;
    return showErr({isValidUser}, 'name-pattern1') || showErr({isValidUser}, 'name-pattern2');
  }
  if(!password.match(/^[a-zA-Z0-9@_\*]+$/)) {
    const isValidUser = false;
    return showErr({isValidUser}, 'pattern-err-1') || showErr({isValidUser}, 'pattern-err-2');
  }
  if(password !== confirm) return showErr({isValidUser: false}, 'match-err');

  fetch('/signup', getOptions({username, password}))
    .then(res => res.json())
    .then(res => showErr(res, 'wrong-name'));
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
