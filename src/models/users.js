const User = require('./user');

const duplicate = function(challenges) {
  return challenges.map(challenge => {
    const id = challenge.id;
    const takenAt = challenge.takenAt;
    const isCompleted = challenge.isCompleted;
    const completedAt = challenge.completedAt;
    return {id, takenAt, isCompleted, completedAt};
  });
};

class Users{
  constructor() {
    this.users = [];
  }

  getUser(name) {
    return this.users.find(user => user.name === name);
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

  static load(userList) {
    const users = new Users();
    userList.forEach(user => {
      users.add(user.name, user.password, duplicate(user.challenges));
    });
    return users;
  }
}

module.exports = Users;
