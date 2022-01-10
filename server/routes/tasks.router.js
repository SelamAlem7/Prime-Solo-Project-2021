const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware')

// Get all tasks
router.get('/', (req, res) => {
  const query = `SELECT * FROM "tasks"`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Getting all tasks', err);
      res.sendStatus(500)
    })
});



// 'GET' route for a specific task belonging to a specific client
  // Make a query to get the specific info from the database
  // Pass in the req.params.id to select a client
  router.get('/:id', (req, res) => {
    const selectedTask = req.params.id;
    const sqlText = `SELECT * FROM "tasks"
                      JOIN "client" 
                        ON "tasks"."client_id"="client"."id"
                          WHERE "client_id"=$1`;

    const sqlValues = [selectedTask]
    pool.query(sqlText,sqlValues)
    .then( result => {
      res.send(result.rows);
    })
  .catch(err => {
      console.log('ERROR: inside get task router by id', err);
      res.sendStatus(500)
    })
  });



// Add an item for the logged in user to the task list 
 router.post('/', rejectUnauthenticated, (req, res) => {
  console.log('/task POST route');
  console.log(req.body);
  console.log('is authenticated?', req.isAuthenticated());
  console.log('user', req.user);
  const sqlText = `
    INSERT INTO "tasks"
      ( "client_id", "task", "completed_by", "completed" )
      VALUES
      ($1, $2, $3, $4);
  `;
  const sqlValues = [
    req.client.id,
    req.body.task,
    req.body.completed_by,
    req.body.completed,
    
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
  // console.log('req.params', req.params);
  // console.log('req.body', req.body);
  const taskToUpdate = req.params.id;
  let currentCompletedStatus = req.body.currentCompletedStatus;
  currentCompletedStatus = 'Y';
  const sqlText = `
    UPDATE "tasks"
      SET "completed" = $1 
      WHERE "id" = $2;
  `;
  const sqlValues = [
    currentCompletedStatus,
    taskToUpdate
  ];

  pool.query(sqlText, sqlValues)
    .then((dbResult) => {
      res.sendStatus(200);
    })
    .catch((dbErr) => {
      console.error(dbErr);
      res.sendStatus(500);
    })
});


module.exports = router;