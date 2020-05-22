const Challenge = require('./challenge');

class Challenges {
  constructor() {
    this.challenges = [];
  }

  add(challenge) {
    const id = this.generateNextId();
    this.challenges.push(new Challenge(id, challenge));
  }

  getChallenge(id) {
    return this.challenges.find(challenge => challenge.getId() === +id);
  }

  addDiscussion(id, title, comments) {
    const challenge = this.getChallenge(id);
    challenge.addDiscussion(title, comments);
  }

  addComment(id, discussionId, name, comment) {
    const challenge = this.getChallenge(id);
    challenge.addComment(discussionId, name, comment);
  }

  addSolver(id, solver) {
    const challenge = this.getChallenge(id);
    challenge.addSolver(solver.name, solver.startedAt, solver.isSolved, solver.solvedAt);
  }

  makeAsSolved(id, name, time) {
    const challenge = this.getChallenge(id);
    challenge.makeSolverSolved(name, time);
  }

  generateNextId() {
    const challenge = this.challenges[this.challenges.length - 1];
    const id = (challenge && challenge.getId()) || 0;
    return id + 1;
  }

  getChallengeStatus(id) {
    const challenge = this.getChallenge(id);
    return challenge.getStatus();
  }

  getStatus(){
    return this.challenges.map(challenge => challenge.getStatus());
  }

  toJSON() {
    return this.getStatus();
  }

  static load(challengeList) {
    const challenges = new Challenges();
    challengeList.forEach(challenge => challenges.add(challenge));
    return challenges;
  }
}

module.exports = Challenges;
