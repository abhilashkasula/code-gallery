const Comments = require('./comments');

class Discussion {
  constructor(id, title, comments) {
    this.id = id;
    this.title = title;
    this.comments = Comments.load(comments);
  }

  addComment(name, comment) {
    this.comments.add(name, comment);
  }
}

module.exports = Discussion;
