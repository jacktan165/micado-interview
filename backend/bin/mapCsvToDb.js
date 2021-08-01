#!/usr/bin/env node

const fs = require("fs");
const csv = require("@fast-csv/parse");
const { format, parse } = require("date-fns");
const { Pool } = require("pg");

const COVID_CSV_FILE = "./csv/covid_19_new_zealand.csv";

const csvData = [];

// TODO: Put in environment variables
const pool = new Pool({
  host: "localhost",
  user: "micado",
  database: "micadointerview",
  password: "myhandsaresweating",
  port: 5432,
});

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

(async () => {
  console.log("Mapping Covid CSV data into database...");

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    fs.createReadStream(COVID_CSV_FILE)
      .pipe(csv.parse())
      .on("data", (data) => {
        csvData.push(data);
      })
      .on("end", async () => {
        // remove the first line: header
        csvData.shift();

        csvData.forEach(async (data) => {
          // value
          data[6] = isNaN(parseInt(data[6])) ? 0 : parseInt(data[6]);

          // parameter
          data[5] = format(
            parse(data[5], "dd/MM/yyyy", new Date()),
            "yyyy/MM/dd"
          );

          // date_last_updated
          data[8] = format(
            parse(data[8], "dd/MM/yyyy", new Date()),
            "yyyy/MM/dd"
          );

          await client.query(
            "INSERT INTO covid (class, category, indicator_name, series_name, sub_series_name, parameter, value, units, date_last_updated) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
            data
          );
        });
      });

    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
  } finally {
    console.log("Mapping complete.");
    console.log("Releasing database connection pool...");
    client.release();
  }
})().catch((err) => console.error(err));
