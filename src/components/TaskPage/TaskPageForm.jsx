import React from 'react';

import {useSelector, useDispatch} from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Card, CardActionArea, CardMedia, Typography, CardContent } from "@material-ui/core";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './TaskPage.css';



function TaskPageForm() {
  const dispatch = useDispatch();
  const history = useHistory();

   // REDUX REDUCER
   const tasks = useSelector((store) => store.tasks)
   const client = useSelector((store) => store.client)
   const oneClient = useSelector((store) => store.oneClient)
   const oneTask = useSelector((store) => store.oneTask)

   const [newTask, setNewTask] = useState('');
   const [completedBy, setCompletedBy] = useState('');
   const [completed, setCompleted] = useState('');


  console.log('This is tasks STORE', tasks); //working
  console.log('This is ONE client', oneClient); //working
  console.log('This is ONE task', oneTask);

//thisTask(tasks)
   function thisTask(tasks){
     console.log('inside thisTask function')
     
     for ( let i = 0; i < tasks.length; i++){
       if (tasks[i].client_id === oneClient){ //filtering out tasks belonging to clicked client
      //    console.log('These are the tasks:', tasks[i]);
      //    console.log('INSIDE thisTask function', tasks.client_id);
      //    console.log(tasks[i].id, 'This is task with i id');
         dispatch({
           type: 'FETCH_THIS_ONE_TASK',
           payload: tasks[i].client_id
         })
      
       } else {
         console.log('There is none');
         
       }
       
     }
   }

   //console.log('This Clients Tasks Are:', thisTask(tasks));
  

  
    // on page load:
  useEffect(() => {
   thisTask(tasks)
  }, [])

  const onAddTask= (event) => {
    event.preventDefault();
    dispatch({
      type: 'ADD_TASKS',
      payload: {
        task: newTask,
        completed_by: completedBy,
        completed: completed,
        client_id: oneClient
      }
    })
  
    setNewTask('');
    setCompleted('');
    setCompletedBy('');
  }


  function deleteTask(task) {
    dispatch({
      type: 'DELETE_TASK',
      payload: newTask
    })
  }

  //  LOCAL
  //  const [completed, setCompleted] = useState('');
  //  const markCompleted = () => {
  //    dispatch ({
  //     type: 'SET_TASKS', 
  //     payload: completed
  //    })
  //    setCompleted('')
  //  }
  function onEdit (task){
    console.log(task.id, 'this is the task id')
 dispatch({
    type: 'FETCH_THIS_TASK_TO_EDIT',
    payload: task.id
  })
    history.push('/add_new_tasks')
  }
  
  return(
    <div>
    {/* <div>
    <h1 key={client.id}> Task List for {client.name} </h1>  
    
    {oneTask.map((task) => {
                    return (
                        <div key={task.id}>
                            <li  className="task_list">
                              {task.task} 
                              <input placeholder="Completed by"/> 

                              <button onClick={e => onEdit(task)}>Edit</button>
                              
                              <label class="container">
                                  <input class="container" type="checkbox" />
                                     <span className="checkmark"></span>
                                </label>
                            </li>

                        </div>
                        
                    );
                })}
    
    
    
    </div>

<div> */}

        

    





<div>
<TableContainer component={Paper}>
      <Table sx={{ minWidth: 150 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Task</TableCell>
            <TableCell align="right">Assigned Staff</TableCell>
            <TableCell align="right">Completed Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {oneTask.map((tasks) => {
            return (

            
            <TableRow
              key={oneTask.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {tasks.task}
              </TableCell>  
              <TableCell align="right">{tasks.task}</TableCell>
              <TableCell align="right">{tasks.completed_by}</TableCell>
              <TableCell align="right">{tasks.completed}</TableCell>
            </TableRow>
            )})}
        </TableBody>
      </Table>
    </TableContainer>
 


<form>
<input
      type="text"
      required="required"
      placeholder="Enter a Task..."
      value={newTask}
      onChange={(event) => setNewTask(event.target.value)}/>

<input
      type="text"
      required="required"
      placeholder="Team Member's Name..."
      value={completedBy}
      onChange={(event) => setCompletedBy(event.target.value)}/>

<label for="completed">Is this Task Completed?</label>

<select onChange={(event) => setCompleted(event.target.value)}>
        <option value="Y">Yes</option>
        <option value="N">No</option>
</select>

<button variant="contained" onClick={() => { onAddTask(event) }}>Add Task</button>


</form>

<Button variant="contained" onClick={() => { deleteClient(clientInfo.id) }}>Delete</Button> 
<Button variant="contained" onClick={() => {history.goBack()}}>Back to Clients</Button>
</div>

</div>
    
//need to have a 2nd reducer that is in charge of holding just one client 

  )




};



export default TaskPageForm;