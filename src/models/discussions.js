const Discussion = require('./discussion');

class Discussions {
  constructor() {
    this.discussions = [];
  }

  add(title, comments) {
    const id = this.generateNextId();
    this.discussions.push(new Discussion(id, title, comments));
  }

  addComment(id, name, comment) {
    const discussion = this.discussions.find(discussion => discussion.id === id);
    discussion.addComment(name, comment);
  }

  generateNextId() {
    const discussion = this.discussions[this.discussions.length];
    const id = (discussion && discussion.id) || 0;
    return id + 1;
  }

  static load(list) {
    const discussions = new Discussions();
    list.forEach(discussion => {
      discussions.add(discussion.title, discussion.comments)
    });
    return discussions;
  }
}

module.exports = Discussions;
