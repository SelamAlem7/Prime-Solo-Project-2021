const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware')

// Get all of the items on the clients task list

 router.get('/', rejectUnauthenticated, (req, res) => {
  pool.query(`SELECT * FROM "tasks";`)
    .then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});



// // TESTING: GET route for specific client & their tasks
//   // Make a query to get the specific info from the database
//   // Pass in the req.params.id to select a client
//   router.get('/:id', (req, res) => {
//     const query = `SELECT "name", "diagnosis_list", "user_id" FROM "client" 
//                     JOIN "tasks" ON "client"."id"="tasks"."client_id" 
//                     WHERE client=$1`;
//     pool.query(query,[req.params.id])
//     .then( result => {
//       res.send(result.rows);
//     })
//     .catch(err => {
//       console.log('ERROR: Get all tasks & clients', err);
//       res.sendStatus(500)
//     })
//   });



// Add an item for the logged in user to the task list 
 router.post('/', rejectUnauthenticated, (req, res) => {
  console.log('/task POST route');
  console.log(req.body);
  console.log('is authenticated?', req.isAuthenticated());
  console.log('user', req.user);
  const sqlText = `
    INSERT INTO "tasks"
      ("task", "completed", "completed_by", client_id)
      VALUES
      ($1, $2, $3, $4);
  `;
  const sqlValues = [
    req.body.task,
    req.body.completed,
    req.body.completed_by,
    req.client_id,
    //req.user.id -- testing
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



// Delete an item if it's something the logged in user added
 router.delete('/:id', (req, res) => {
  const query = `
      DELETE FROM "tasks"
      WHERE "tasks"."id"=$1;
  `;
  const sqlValues = [req.params.id]
  console.log(query);
pool.query(query, sqlValues)
  .then( result => {
    res.sendStatus(202)
  })
  .catch(err => {
    console.log('ERROR: DELETE task request failed:', err);
    res.sendStatus(500)
  })
});


// Update an item if it's something the logged in user added
router.put('/:id', (req, res) => {
 
});


module.exports = router;
