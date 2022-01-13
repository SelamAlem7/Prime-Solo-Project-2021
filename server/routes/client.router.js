const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware')

// Getting all info about our client 
 router.get('/', rejectUnauthenticated, (req, res) => {
  pool.query(`SELECT * FROM "client"`)
    .then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});


//Getting client by id:
router.get('/:id', (req, res) => {
  const selectedClient = req.params.id;
  //we will then get all movies with details and genre included using JOIN query
  const sqlText = `
  SELECT * FROM "client"
    JOIN "tasks"
      ON "client"."id"="tasks"."client_id"
        WHERE "client_id"=$1;`;
  const sqlValues = [selectedClient]
  pool.query(sqlText,sqlValues)
  .then( result => {
    res.send(result.rows);
  })
.catch(err => {
    console.log('ERROR: Getting clicked client task', err);
    res.sendStatus(500)
  })
});

// Add a client for the logged in user to the client table in our database
 router.post('/', rejectUnauthenticated, (req, res) => {
  console.log('/client POST route');
  console.log(req.body);
  console.log('is authenticated?', req.isAuthenticated());
  console.log('user', req.user);
  const sqlText = `
    INSERT INTO "client"
      ("name","user_id")
      VALUES
      ($1, $2 );
  `;
  const sqlValues = [
    req.body.name,
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



// Delete a client if it's something the logged in user added
 router.delete('/:id', (req, res) => {
    const query = `
        DELETE FROM "client"
        WHERE "client"."id"=$1;
    `;
    const sqlValues = [req.params.id]
    console.log(query);
  pool.query(query, sqlValues)
    .then( result => {
      res.sendStatus(202)
    })
    .catch(err => {
      console.log('ERROR: DELETE request failed:', err);
      res.sendStatus(500)
    })
  });





module.exports = router;
