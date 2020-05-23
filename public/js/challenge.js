const showErr = function({err, msg}) {
  if(!err) return location.reload();
  const message = document.querySelector('#err-msg');
  message.innerText = msg;
  message.classList.remove('hide');
  setTimeout(() => message.classList.add('hide'), 3000);
};

const getOptions = function(body) {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
};

const performAction = function() {
  const id = document.querySelector('#secret').value;
  const action = event.target.getAttribute('value');
  fetch(action, getOptions({id})).then(res => res.json()).then(showErr);
};

const toggleDiscussions = function() {
  const target = event.target.nextElementSibling;
  if(target.classList.contains('hide-display')) {
    return target.classList.remove('hide-display');
  }
  target.classList.add('hide-display');
};

const createDiscussion = function() {
  const title = document.querySelector('#discussion-title-new').value.trim();
  const comment = document.querySelector('#discussion-comment-new').value.trim();
  const id = document.querySelector('#secret').getAttribute('value');
  if(!title || !comment) return;
  const body = {title, comment, id};
  fetch('newDiscussion', getOptions(body))
    .then(res => res.json())
    .then(showErr);
};

const addListeners = function() {
  const actionButton = document.querySelector('#action');
  const discussions = Array.from(document.querySelectorAll('.discussion-title'));
  const createButton = document.querySelector('#discussion-create');
  actionButton && actionButton.addEventListener('click', performAction);
  discussions.forEach(d => d.addEventListener('click', toggleDiscussions));
  createButton.addEventListener('click', createDiscussion);
}

window.onload = addListeners;