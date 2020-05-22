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
    const discussion = this.discussions.find(discussion => discussion.getId() === id);
    discussion.addComment(name, comment);
  }

  generateNextId() {
    const discussion = this.discussions[this.discussions.length - 1];
    const id = (discussion && discussion.getId()) || 0;
    return id + 1;
  }

  toJSON() {
    return this.discussions;
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
