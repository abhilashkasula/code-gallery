class Comments {
  constructor() {
    this.comments = [];
  }

  add(name, comment) {
    this.comments.push({name, comment});
  }

  static load(commentList) {
    const comments = new Comments();
    commentList.forEach(comment => {
      comments.add(comment.name, comment.comment);
    });
    return comments;
  }
}

module.exports = Comments;
