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
    dispatch({
      type: 'FETCH_THIS_TASK_TO_EDIT',
      payload: {oneTask: taskID}
    })
   
     
 }, [])

 

                                     
                                     



  return(
    <div> 
      
    <h1> Task to Edit </h1>
    
    <p> {oneTask} </p> 
       
        
     
   <input placeholder="Enter new Task"/> 
   </div>








  )//end return 

}; //end TaskPageEdit function



export default TaskPageEdit;