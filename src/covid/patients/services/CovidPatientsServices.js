class CovidPatientsServices {
  constructor(db) {
    this.db = db;
  }

  async getActivePatients(startDate, endDate) {
    return this.db.getActivePatients(startDate, endDate);
  }

  async getRecoveredPatients(startDate, endDate) {
    return this.db.getRecoveredPatients(startDate, endDate);
  }
}

module.exports = CovidPatientsServices;
