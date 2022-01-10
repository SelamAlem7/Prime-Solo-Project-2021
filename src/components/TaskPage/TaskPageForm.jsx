import React from 'react';

import {useSelector, useDispatch} from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './TaskPage.css';



function TaskPageForm() {
  const dispatch = useDispatch();
  const history = useHistory();

   // REDUX REDUCER
   const tasks = useSelector((store) => store.tasks)
   const client = useSelector((store) => store.client)


  //LOCAL STATES
  const [task, setTask] = useState('');
  const [completed, setCompleted] = useState(0);
  const [completedBy, setCompletedBy] = useState('');



  //on page load:
  useEffect(() => {
    dispatch({ type: 'FETCH_TASKS' })
  }, [])

  const seeThisTask = (task) => {
    history.push('/tasks');
    dispatch({
        type: 'FETCH_THIS_TASK',
        payload: client.id
    })
}

  const onAddTask= (event) => {
    event.preventDefault();
    dispatch({
      type: 'ADD_TASKS',
      payload: {
        client_id: client.id,
        task: task,
        completed_by: completedBy,
        completed: completed
      }
    })
    setTask('');
    setCompleted('');
    setCompletedBy('');
  }

  function deleteTask(tasks) {
    dispatch({
      type: 'DELETE_TASK',
      payload: tasks
    })
  }

  // function handleMarkCompleted(){
  //   const taskToMark = $(this).data('id');
  //   const currentCompletedStatus = $(this).data('completed-status');


  // }


  return(
    <div>
    <h1> Task List for {client.name} </h1>

    <form onSubmit={onAddTask}>
        <input
          type="text"
          required="required"
          placeholder="Enter a Task..."
          value={task}
          onChange={(event) => setTask(event.target.value)}
        />

        <input
          type="text"
          required="required"
          placeholder="Team Member's Name..."
          value={completedBy}
          onChange={(event) => setCompletedBy(event.target.value)}
        />

        <label for="completed">Is this Task Completed?</label>
        <select onChange={(event) => setCompleted(event.target.value)}>
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