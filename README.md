## Micado Interview

An API server returning the number of active and recovered covid patients based on the date range.

## Requirements

- [Node](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/en/)
- [Docker compose](https://docs.docker.com/compose/install/)

## Setup

- Run `docker-compose up -d micado-interview-db`
- Run `yarn`
- Run `yarn mapCsvToDb` once to populate the database.
- Run `yarn start`
