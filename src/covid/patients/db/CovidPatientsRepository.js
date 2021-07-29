class CovidPatientsRepository {
  constructor(client) {
    this.client = client;
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
