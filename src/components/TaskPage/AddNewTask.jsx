import React from 'react';

import {useSelector, useDispatch} from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Card, CardActionArea, CardMedia, Typography, CardContent } from "@material-ui/core";
import './TaskPage.css';



function TaskPageForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  const client = useSelector((store) => store.client)



  //LOCAL STATES
  const [NewTask, setNewTask] = useState('');
  const [completedBy, setCompletedBy] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [clientId, setClientId] = useState(0);
 

  const handleNewTask = (event) => {
    setNewTask(event);
}

const handleCompletedBy = (event) => {
    setCompletedBy(event);
}

const handleCompleted = (event) => {
    setCompleted(event);
}

const handleClientId = (event) => {
    setClientId(event);
}



  const onAddTask= (event) => {
    event.preventDefault();
    dispatch({
      type: 'ADD_TASKS',
      payload: {
        task: task,
        completed_by: completedBy,
        completed: completed,
        client_id: client.id
      }
    })
    setNewTask('');
    setCompletedBy('');
    setCompleted('');
    setClientId('');
    history.goBack();
  }



  return(
    <div>
    <h1> Task List for {client[0].name} </h1>

    <form onSubmit={onAddTask}>
        <input
          type="text"
          required="required"
          placeholder="Enter a Task..."
          value={task}
          onChange={(event) => handleNewTask(event.target.value)}
        />

        <input
          type="text"
          required="required"
          placeholder="Team Member's Name..."
          value={completedBy}
          onChange={(event) => handleCompletedBy(event.target.value)}
        />

        <label for="completed">Is this Task Completed?</label>
        <select onChange={(event) => handleCompleted(event.target.value)}>
            <option value="">Yes</option>
            <option value="">No</option>
        </select>


        <button>Add Task</button>
        
    </form>


    <h2>Task List:</h2>
    <ul>
      {tasks.map((task) => {
        return (
          <li key={task.id}> 
          {task.task}
          {task.completed_by}
          {task.completed}
          <button onClick={() => { deleteTask(task.id) }}>Delete</button> </li> //keeps log of the user ID who added client in our Database
        )
      })}
    </ul>
    </div>
    


  )




};



export default TaskPageForm;