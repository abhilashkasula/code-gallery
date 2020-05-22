class Solver {
  constructor(name, startedAt, isSolved, solvedAt) {
    this.name = name;
    this.startedAt = startedAt;
    this.isSolved = isSolved;
    this.solvedAt = solvedAt;
  }

  getName() {
    return this.name;
  }
  
  markAsComplete(time) {
    this.isSolved = true;
    this.solvedAt = time;
  }
}

module.exports = Solver;
