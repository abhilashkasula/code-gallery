class User {
  constructor(username, password, challenges) {
    this.name = username;
    this.password = password;
    this.challenges = challenges;
  }

  validate(password) {
    if(this.password === password) {
      return this.name;
    }
    return undefined;
  }

  getChallenges() {
    return this.challenges.map(challenge => {
      const id = challenge.id;
      const takenAt = challenge.takenAt;
      const isCompleted = challenge.isCompleted;
      const completedAt = challenge.completedAt;
      return {id, takenAt, isCompleted, completedAt};
    });
  }
}

module.exports = User;
