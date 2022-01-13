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



// `SELECT * FROM "tasks"
//   JOIN "client"
//     ON "tasks"."client_id" = "client"."id"
//     WHERE "id"=$1`;

// `SELECT * FROM "tasks"
//     WHERE "id"=$1 AND "client_id"=$2`

// 'GET' route for a specific task belonging to a specific client
  // Make a query to get the specific info from the database
  // Pass in the req.params.id to select a client
  router.get('/:id', (req, res) => {
    const selectedTask = req.params.id;
    console.log('TESTING GET ROUTE by id', req.params.id);
    const sqlText = `SELECT * FROM "tasks"
                       WHERE "client_id"=$1;`;

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
  console.log('INSIDE POST route', req.body);
  console.log('is authenticated?', req.isAuthenticated());
  console.log('user', req.user);
  const sqlText = `
    INSERT INTO "tasks"
      ("task", "completed_by", "completed", "client_id" )
      VALUES
      ($1, $2, $3, $4);
  `;
  const sqlValues = [
    req.body.task,
    req.body.completed_by,
    req.body.completed,
    req.body.client_id
    
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
  const taskToUpdate = req.body.id;
  // let currentCompletedStatus = req.body.currentCompletedStatus;
  // currentCompletedStatus = 'Y';
  const queryText = `
    UPDATE "tasks"
      SET "task" = $1 ,
          "completed_by" = $2,
          "completed" = $3,
      WHERE "id" = $4;
  `;
  pool.query(queryText, [
    req.body.task,
    req.body.completed_by,
    req.body.completed,
    taskToUpdate
  ])
    .then((res) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error('error in EDIT task route', error);
      res.sendStatus(500);
    })
});


module.exports = router;