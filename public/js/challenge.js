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
  const discussions = Array.from(document.querySelectorAll('.discussion-title'));
  actionButton && actionButton.addEventListener('click', performAction);
  discussions.forEach(discussion => {
    discussion.addEventListener('click', () => {
      const target = event.target.nextElementSibling;
      if(target.classList.contains('hide-display')) {
        return target.classList.remove('hide-display');
      }
      target.classList.add('hide-display');
    });
  });
}

window.onload = addListeners;