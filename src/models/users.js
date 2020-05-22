const User = require('./user');

class Users{
  constructor() {
    this.users = [];
  }

  getUser(name) {
    return this.users.find(user => user.getName() === name);
  }
  
  add(name, password, challenges) {
    const user = this.getUser(name);
    if(user) return false;
    this.users.push(new User(name, password, challenges));
    return true;
  }

  validate(username, password) {
    const user = this.getUser(username);
    if(user) return user.validate(password);
    return undefined;
  }

  addChallenge(username, challengeId) {
    const user = this.getUser(username);
    user.addChallenge(challengeId);
  }

  toJSON() {
    return this.users;
  }

  getUserStatus(name) {
    const user = this.getUser(name);
    return user.getStatus();
  }

  static load(userList) {
    const users = new Users();
    userList.forEach(user => {
      users.add(user.name, user.password, user.challenges.map(id => id));
    });
    return users;
  }
}

module.exports = Users;
