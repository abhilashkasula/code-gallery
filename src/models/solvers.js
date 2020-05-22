const Solver = require('./solver');

class Solvers {
  constructor() {
    this.solvers = [];
  }

  add(name, startedAt, isSolved, solvedAt) {
    this.solvers.push(new Solver(name, startedAt, isSolved, solvedAt));
  }

  makeAsSolved(name, time) {
    const solver = this.solvers.find(solver => solver.getName() === name);
    solver.makeAsComplete(time);
  }

  toJSON() {
    return this.getStatus();
  }

  getStatus() {
    return this.solvers.map(solver => solver.getSolverStatus());
  }

  static load(list) {
    const solvers = new Solvers();
    list.forEach(({name, startedAt, isSolved, solvedAt}) => {
      solvers.add(name, startedAt, isSolved, solvedAt);
    });
    return solvers;
  }
}

module.exports = Solvers;
