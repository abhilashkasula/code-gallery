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
  if(!title || !comment || !id) return;
  const body = {title, comment, id};
  fetch('newDiscussion', getOptions(body))
    .then(res => res.json())
    .then(showErr);
};

const generateComment = function(comment) {
  return `<div class="comment">
    <h5 class="posted-by">${comment.name}</h5>
    <p class="comment-text">${comment.comment}</p>
  </div>`
};

const drawDiscussion = function({err, msg, discussion}) {
  if(err) {
    const message = document.querySelector('#err-msg');
    message.innerText = msg;
    message.classList.remove('hide');
    return setTimeout(() => message.classList.add('hide'), 3000);
  }
  const comments = document.querySelector(`#discussion${discussion.id}`).children[0];
  comments.innerHTML = discussion.comments.map(generateComment).join('\n');
};

const addComment = function() {
  const elem = event.target.previousElementSibling;
  const comment = elem.value.trim();
  const discussionId = event.target.getAttribute('value');
  const challengeId = document.querySelector('#secret').value;
  if(!comment || !discussionId || !challengeId) return;
  const body = getOptions({comment, discussionId, challengeId});
  elem.value = '';
  fetch('addComment', body).then(res => res.json()).then(drawDiscussion);
};

const addListeners = function() {
  const actionButton = document.querySelector('#action');
  const discussions = Array.from(document.querySelectorAll('.discussion-title'));
  const createButton = document.querySelector('#discussion-create');
  const comments = Array.from(document.querySelectorAll('.comment-action'));
  actionButton && actionButton.addEventListener('click', performAction);
  discussions.forEach(d => d.addEventListener('click', toggleDiscussions));
  createButton.addEventListener('click', createDiscussion);
  comments.forEach(c => c.addEventListener('click', addComment));
};

window.onload = addListeners;