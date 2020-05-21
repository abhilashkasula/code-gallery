const getFetchOptions = function(body) {
  return {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  }
};

const createNewChallenge = function() {
  const title = document.querySelector('#new-challenge-title').value.trim();
  const description = document.querySelector('#new-challenge-desc').value.trim();
  if(!title || !description) return;
  fetch('/challenges/new', getFetchOptions({title, description}))
    .then(() => location.reload());
};

const addListeners = function() {
  const button = document.querySelector('#new-challenge');
  button.addEventListener('click', createNewChallenge);
};

const main = function() {
  addListeners();
};

window.onload = main;
