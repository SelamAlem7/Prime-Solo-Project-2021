import React from 'react';

import {useSelector, useDispatch} from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
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
  console.log('This is tasks STORE', tasks);
  console.log('This is ONE client', oneClient);
  console.log('This is ONE task', oneTask);


  const thisClientsTasks = [];

   function thisTask(){
     for ( let i = 0; i < tasks.length; i++){
       if (tasks[i].client_id == oneClient[0].id){ //filtering out tasks belonging to clicked client
         console.log('These are the tasks:', tasks[i]);
         console.log(tasks[i].id, 'This is task with i id');
         dispatch({
           type: 'FETCH_THIS_ONE_TASK',
           payload: tasks[i].id
         })
       }
       else{
         console.log('There is none');
       }
     }
   }

   console.log('This Clients Tasks Are:', thisClientsTasks);


  

  
    //on page load:
  useEffect(() => {
    dispatch({ type: 'FETCH_TASKS' });
    thisTask(tasks);
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
    
    {tasks.map((task) => {
                    return (
                        <div key={tasks.id}>
                            <li>
                              {task.task} 
                              <input placeholder="Completed by"/> 
                              <button>Edit</button>
                              {/* <input className="checkbox" type="checkbox" value={completed} onChange={e => setCompleted(e.target.value)}/> */}
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