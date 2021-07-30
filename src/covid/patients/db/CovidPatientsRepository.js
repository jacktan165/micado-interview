class CovidPatientsRepository {
  constructor(client) {
    this.client = client;
  }

  async getAvgNumOfActivePatients(startDate, endDate) {
    const { rows } = await this.client.query(
      "SELECT AVG(value) as averageValue FROM covid WHERE sub_series_name = 'Active' AND parameter >= $1 AND parameter < $2 GROUP BY sub_series_name",
      [startDate, endDate]
    );

    return rows;
  }

  async getActivePatients(startDate, endDate) {
    const { rows } = await this.client.query(
      "SELECT sub_series_name,parameter,value FROM covid WHERE sub_series_name = 'Active' AND parameter >= $1 AND parameter < $2",
      [startDate, endDate]
    );

    return rows;
  }

  async getRecoveredPatients(startDate, endDate) {
    const { rows } = await this.client.query(
      "SELECT sub_series_name,parameter,value FROM covid WHERE sub_series_name = 'Recovered' AND parameter >= $1 AND parameter < $2",
      [startDate, endDate]
    );

    return rows;
  }
}

module.exports = CovidPatientsRepository;
