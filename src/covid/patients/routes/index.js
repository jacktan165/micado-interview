const express = require("express");
const { Pool } = require("pg");

const CovidPatientsRepository = require("../db/CovidPatientsRepository");
const CovidPatientsServices = require("../services/CovidPatientsServices");

const router = express.Router();

// TODO: Put in environment variables
const pool = new Pool({
  host: "localhost",
  user: "micado",
  database: "micadointerview",
  password: "myhandsaresweating",
  port: 5432,
});

const covidPatientsRepository = new CovidPatientsRepository(pool);

const covidPatientsServices = new CovidPatientsServices(
  covidPatientsRepository
);

router.get("/active", async (req, res, next) => {
  const result = await covidPatientsServices.getActivePatients(
    req.query.startDate,
    req.query.endDate
  );

  res.status(200).send(result);
});

router.get("/recovered", async (req, res, next) => {
  const result = await covidPatientsServices.getRecoveredPatients(
    req.query.startDate,
    req.query.endDate
  );

  res.status(200).send(result);
});

module.exports = router;
