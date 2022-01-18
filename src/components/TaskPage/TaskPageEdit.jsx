import React from 'react';

import {useSelector, useDispatch} from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory, useParams} from 'react-router-dom';
import './TaskPage.css';



function TaskPageEdit() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const editTask = useSelector((store) => store.editTask)
  const tasks = useSelector((store) => store.tasks)
  const client = useSelector((store) => store.client)
  const oneClient = useSelector((store) => store.oneClient)
  const oneTask = useSelector((store) => store.oneTask)

  const [newTask, setNewTask] = useState('');
  const [completedBy, setCompletedBy] = useState('');
  const [completed, setCompleted] = useState('');

// function checkEdit (){
//   for (let i = 0; i < task.length; i++){
//     if (task[i].id === editTask){
//       console.log('we got some edits')
//       dispatch({
//         type: 'FETCH_THIS_TASK_TO_EDIT'
//       })
//     }
//   }
// }
  


//   on page load:
   useEffect(() => {
    console.log('inside TASKPAGEEDIT params.id:', params.id)
    dispatch({
      type: 'FETCH_THIS_TASK',
      payload: params.id
    })
     
 }, [])

 

                                     
                                     



  return(
    <div>
    <h1> Task to Edit </h1>
    
    <h3> {oneTask.task} </h3>
       
        <p>  </p>
     
   {/* <input/>  */}
   </div>
  )
};



export default TaskPageEdit;