class Solver {
  constructor(name, startedAt, isSolved, solvedAt) {
    this.name = name;
    this.startedAt = new Date(startedAt);
    this.isSolved = isSolved;
    this.solvedAt = new Date(solvedAt);
  }

  getName() {
    return this.name;
  }

  getSolverStatus() {
    return {
      name: this.name,
      startedAt: this.startedAt,
      isSolved: this.isSolved,
      solvedAt: this.solvedAt
    }
  }
  
  markAsComplete(time) {
    this.isSolved = true;
    this.solvedAt = time;
  }
}

module.exports = Solver;
