import React from 'react';

import {useSelector, useDispatch} from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './TaskPage.css';



function AddNewTask() {
  const dispatch = useDispatch();
  const history = useHistory();

   // REDUX REDUCER
   const tasks = useSelector((store) => store.tasks)
   const client = useSelector((store) => store.client)


  //LOCAL STATES
  const [task, setTask] = useState('');
  const [completedBy, setCompletedBy] = useState('');
  const [completed, setCompleted] = useState('');
  



//   //on page load:
//   useEffect(() => {
//     dispatch({ type: 'FETCH_TASKS' })
//   }, [])

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

        

    

    <form onSubmit={onAddTask}>


    <h2>Task List:</h2>

<table>

<thead>
    <tr>
        <th>Task:</th>
        <th>Completed By:</th>
        <th>Completed?</th>
    </tr>
</thead>


<tbody>
  {tasks.map((task) => {
    return (
      <tr key={task.id}> 
      <td>{task.task}</td>
      <td>{task.completed_by}</td>
      <td>{task.completed}</td>
      </tr> //keeps log of the user ID who added client in our Database
    )
  })}
</tbody>
</table>
    <input
          type="text"
          required="required"
          placeholder="Enter a Task..."
          value={task}
          onChange={(event) => setTask(event.target.value)}/>

    <input
          type="text"
          required="required"
          placeholder="Team Member's Name..."
          value={completedBy}
          onChange={(event) => setCompletedBy(event.target.value)}/>

    <label for="completed">Is this Task Completed?</label>
    <select onChange={(event) => setCompleted(event.target.value)}>
            <option value="">Yes</option>
            <option value="">No</option>
    </select>
    <button>Add Task</button>
    </form>

    <button onClick={() => { deleteClient(clientInfo.id) }}>Delete</button> 
    </div>

    )


};



export default AddNewTask;