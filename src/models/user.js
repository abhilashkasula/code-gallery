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

  addChallenge(id) {
    !this.challenges.includes(id) && this.challenges.push(id);
  }

  getChallenges() {
    return this.challenges.map(id => id);
  }

  getName() {
    return this.name;
  }

  getStatus() {
    return {
      name: this.name,
      challenges: this.getChallenges()
    };
  }
}

module.exports = User;
