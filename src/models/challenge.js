const Solvers = require('./solvers');
const Discussions = require('./discussions');

class Challenge {
  constructor(id, challenge) {
    this.id = id;
    this.title = challenge.title;
    this.description = challenge.description;
    this.createdBy = challenge.createdBy;
    this.createdAt = new Date(challenge.createdAt);
    this.solvers = Solvers.load(challenge.solvers);
    this.discussions = Discussions.load(challenge.discussions);
  }

  addDiscussion(title, comments) {
    this.discussions.add(title, comments);
  }

  getId() {
    return this.id;
  }

  addComment(discussionId, name, comment) {
    this.discussions.addComment(discussionId, name, comment);
  }

  addSolver(name, startedAt, isSolved, solvedAt) {
    this.solvers.add(name, startedAt, isSolved, solvedAt);
  }

  makeSolverSolved(name, time) {
    this.solvers.makeAsSolved(name, time);
  }

  getStatus() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      createdBy: this.createdBy,
      createdAt: this.createdAt,
      solvers: this.solvers.getStatus(),
      discussions: this.discussions.getStatus()
    }
  }
}

module.exports = Challenge;
