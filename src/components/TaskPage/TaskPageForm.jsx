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




  //on page load:
  // useEffect(() => {
  //   dispatch({ type: 'FETCH_TASKS' })
  // }, [])


  return(
    <div>
    <h1> Task List for {client[0].name} </h1>
    {tasks.map((task) => {
                    return (
                        <div key={task.id}>
                            <p>{task.task}</p>
                        </div>
                    );
                })}
    <Button variant="contained" onClick={() => {history.goBack()}}>Back to Clients</Button>
    
    
    </div>
    


  )




};



export default TaskPageForm;