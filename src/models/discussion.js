const Comments = require('./comments');

class Discussion {
  constructor(id, title, comments) {
    this.id = id;
    this.title = title;
    this.comments = Comments.load(comments);
  }

  getId() {
    return this.id;
  }

  getStatus() {
    return {
      id: this.id,
      title: this.title,
      comments: this.comments.getStatus()
    }
  }

  addComment(name, comment) {
    this.comments.add(name, comment);
  }
}

module.exports = Discussion;
