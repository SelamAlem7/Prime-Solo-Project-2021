const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware')

// Getting all info about our client 
 router.get('/', rejectUnauthenticated, (req, res) => {
  pool.query(`SELECT * FROM "client";`)
    .then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

// Add a client for the logged in user to the client table in our database
 
 router.post('/', rejectUnauthenticated, (req, res) => {
  console.log('/client POST route');
  console.log(req.body);
  console.log('is authenticated?', req.isAuthenticated());
  console.log('user', req.user);
  const sqlText = `
    INSERT INTO "client"
      ("name", "diagnosis_list", "user_id")
      VALUES
      ($1, $2, $3);
  `;
  const sqlValues = [
    req.body.name,
    req.body.diagnosis_list,
    req.user.id
  ];
  pool.query(sqlText, sqlValues)
    .then((dbRes) => {
      res.sendStatus(201);
    })
    .catch((dbErr) => {
      console.error(dbErr);
      res.sendStatus(500);
    });
});






module.exports = router;
