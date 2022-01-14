import React from 'react';

import {useSelector, useDispatch} from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './TaskPage.css';



function AddNewTask() {
  const dispatch = useDispatch();
  const history = useHistory();

  const editTask = useSelector((store) => store.editTask)
function checkEdit (){
  for (let i = 0; i < task.length; i++){
    if (task[i].id === editTask){
      console.log('we got some edits')
      dispatch({
        type: 'FETCH_THIS_TASK_TO_EDIT'
      })
    }
  }
}
  


//   on page load:
   useEffect(() => {
    dispatch({ type: 'FETCH_TASKS' })
     console.log('tasks in addnewtask', tasks)
 }, [])






  return(
    <div>
    <h1> Task to Edit </h1>
      <div key={editTask}>  
        {editTask}
      </div>
   <input/> 
   </div>
  )
};



export default AddNewTask;