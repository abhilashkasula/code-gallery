const showErr = function({err, msg}) {
  if(!err) return location.reload();
  const message = document.querySelector('#err-msg');
  message.innerText = msg;
  message.classList.remove('hide');
  setTimeout(() => message.classList.add('hide'), 3000);
};

const performAction = function() {
  const id = document.querySelector('#secret').value;
  const action = event.target.getAttribute('value');
  const body = JSON.stringify({id});
  fetch(action, {method: 'POST', headers: {'Content-Type': 'application/json'}, body})
    .then(res => res.json())
    .then(showErr);
};

const addListeners = function() {
  const actionButton = document.querySelector('#action');
  actionButton && actionButton.addEventListener('click', performAction);
}

window.onload = addListeners;