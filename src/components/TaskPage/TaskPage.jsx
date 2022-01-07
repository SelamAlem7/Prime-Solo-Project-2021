import React from 'react';

import {useSelector, useDispatch} from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './TaskPage.css';


function TaskPage() {
  const dispatch = useDispatch();
  const history = useHistory();

   // REDUX REDUCER
   const tasks = useSelector(store => store.tasks)
   const client = useSelector(store => store.client)
   const user = useSelector(store => store.user)


  //LOCAL STATES
  const [task, setTask] = useState('');
  const [completed, setCompleted] = useState('');
  const [completedBy, setCompletedBy] = useState('');



  //on page load:
  useEffect(() => {
    dispatch({ type: 'FETCH_TASKS' })
  }, [])

  const onAddTask= (event) => {
    event.preventDefault();
    dispatch({
      type: 'ADD_TASKS',
      payload: {
        task: task,
        completed: completed,
        completed_by: completedBy
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
            placeholder="Add A Task To Complete"
            value={task}
            onChange={(event) => setTask(event.target.value)}
            />
          <input
            placeholder="Type F for new tasks"
            // type="checkbox"
            value={completed}
            onChange={(event) => setCompleted(event.target.value)}
            />
          <input
            placeholder="Who completed This"
            value={completedBy}
            onChange={(event) => setCompletedBy(event.target.value)}
            />
          <button>Add Tasks</button>
        </form>

        <h2>Clients Task List:</h2>
        <ul>
        {tasks.map((tasks) => {
          return (
            <li className="taskList" key={tasks.id}> {tasks.task} ➡
            { tasks.client_id === client.id && <button className="deleteBtn" onClick={() => { deleteTask(tasks.id) }}>Delete</button>}</li> //keeps log of the user ID who added client in our Database
          )
        })}
      </ul>
    </div>

  )

    



}

export default TaskPage;
