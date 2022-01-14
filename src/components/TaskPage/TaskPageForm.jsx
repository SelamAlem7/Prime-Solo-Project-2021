import React from 'react';

import {useSelector, useDispatch} from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Card, CardActionArea, CardMedia, Typography, CardContent } from "@material-ui/core";
import './TaskPage.css';



function TaskPageForm() {
  const dispatch = useDispatch();
  const history = useHistory();

   // REDUX REDUCER
   const tasks = useSelector((store) => store.tasks)
   const client = useSelector((store) => store.client)
   const oneClient = useSelector((store) => store.oneClient)
   const oneTask = useSelector((store) => store.oneTask)




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
           payload: tasks[i].id
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

  

  //  LOCAL
  //  const [completed, setCompleted] = useState('');
  //  const markCompleted = () => {
  //    dispatch ({
  //     type: 'SET_TASKS', 
  //     payload: completed
  //    })
  //    setCompleted('')
  //  }

  return(
    <div>
    <h1 key={client.id}> Task List for {client.name} </h1>  
    
    {oneTask.map((task) => {
                    return (
                        <div key={oneTask.id}>
                            <li  className="task_list">
                              {task.task} 
                              <input placeholder="Completed by"/> 
                              <button onClick={() => {history.push('/add_new_tasks')}}>Edit</button>
                              <label class="container">
                                  <input class="container" type="checkbox" />
                                     <span className="checkmark"></span>
                                </label>
                            </li>

                        </div>
                        
                    );
                })}
    <Button variant="contained" onClick={() => {history.push('/add_new_tasks')}}>Add Task</Button>
    <Button variant="contained" onClick={() => {history.goBack()}}>Back to Clients</Button>
    
    
    </div>
    
//need to have a 2nd reducer that is in charge of holding just one client 

  )




};



export default TaskPageForm;