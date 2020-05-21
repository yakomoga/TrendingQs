# TrendingQuestions

A Twitter Facebook Mashup Quiz game

## Background

Pitch Deck for the project (template from Google Ventures):
https://docs.google.com/presentation/d/1dv2TSBIKWLv7cPyQvQncISu316iFXRXFCRaRKQ4m8dw/edit#slide=id.gd5b09a965_5_0
Database schema
https://app.dbdesigner.net/designer/schema/330364

## Setup

### Dependencies

- Run `npm install` in project directory. This will install server-related dependencies such as `express`.
- `cd client` and run `npm install`. This will install client dependencies (React). Also you need to run `npm install twit` to install the Twitter library for the Twitter API calls.

### Database Prep

- Access the MySQL interface in your terminal by running `mysql -u root -p`
- Create a new database called TrendingQs: `create database TrendingQs`
- Add a `.env` file to the main folder of this repository containing the MySQL authentication information for MySQL user. For example:

```bash
  DB_HOST=localhost
  DB_USER=root
  DB_NAME=facebook
  DB_PASS=YOURPASSWORD
```

- Run `npm run migrate` in the main folder of this repository, in a new terminal window. This will create a table called 'students' in your database.

- Make sure you understand how the `students` table is constructed. In your MySQL console, you can run `use TrendingQs;` and then `describe questions;` to see the structure of the questions table.

### Development

- Run `npm start` in project directory to start the Express server on port 5000
- `cd client` and run `npm start` to start client server in development mode with hot reloading in port 3000.
