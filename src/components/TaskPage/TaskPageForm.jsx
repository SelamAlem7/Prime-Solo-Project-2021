import React from 'react';

import {useSelector, useDispatch} from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Card, CardActionArea, CardMedia, Typography, CardContent } from "@material-ui/core";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './TaskPage.css';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import swal from 'sweetalert';
import { createTheme } from '@mui/material/styles';








function TaskPageForm() {
      // on page load:
      useEffect(() => {
        dispatch({
          type: 'FETCH_THIS_ONE_TASK',
          payload: oneClient
        })
      }, [])

  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  

   // REDUX REDUCER
   const tasks = useSelector((store) => store.tasks)
   const client = useSelector((store) => store.client)
   const oneClient = useSelector((store) => store.oneClient)
   const oneTask = useSelector((store) => store.oneTask)


   const [newTask, setNewTask] = useState('');
   const [completedBy, setCompletedBy] = useState('');
   const [completed, setCompleted] = useState('');
   
 


  console.log('This is tasks STORE', tasks); //working
  console.log('This is ONE client', oneClient); //working
  console.log('This is ONE task', oneTask);



//thisTask(tasks)
   function thisTask(tasks){
     console.log('inside thisTask function')
     
    //  for ( let i = 0; i < tasks.length; i++){
    //    if (tasks[i].client_id === oneClient){ //filtering out tasks belonging to clicked client
      //    console.log('These are the tasks:', tasks[i]);
      //    console.log('INSIDE thisTask function', tasks.client_id);
      //    console.log(tasks[i].id, 'This is task with i id');
         dispatch({
           type: 'FETCH_THIS_ONE_TASK',
           payload: oneClient
         })
      
    //    } else {
    //      console.log('There is none');
         
    //    }
       
    //  }
   }

 
  const onAddTask= () => {
    //event.preventDefault();
    dispatch({
      type: 'ADD_TASKS',
      payload: {
        task: newTask,
        completed_by: completedBy,
        completed: completed,
        client_id: oneClient
      }
    });
    
    setNewTask('');
    setCompleted('');
    setCompletedBy('');
    swal(`Task has been saved!`, { icon: 'success'});
    dispatch({
      type: 'FETCH_TASKS'
    });
    history.push('/tasks')
  }




  function onEdit (task){
    console.log('this is the task id onEdit', task )
 dispatch({
    type: 'FETCH_THIS_TASK_TO_EDIT',
    payload: {oneTask: task}
  })
    history.push('/edit_task')
  }



  const deleteTask = (taskID) => {
    swal({
      title: `Are you sure you want to delete?`,
      icon: 'error',
      buttons: true,
      dangerMode: true,
    }).then((willDelete)=> {
      if(willDelete){
        dispatch({
          type: 'DELETE_TASK',
          payload: {
            oneTask: taskID,
            oneClient: oneClient
          }
        })
        swal(`Task has been deleted`,  { icon: 'success' })
    }
    })
  }



  return(
    <div>

<form>
  <h3 className="enterTask">Enter A New Task:</h3>
<TextField id="outlined-basic" className="taskBox"
            placeholder="Enter a Task..." value={newTask} sx={{marginLeft: 2, backgroundColor: "#fce4ec",height: 55, marginTop: 3}}
            onChange={(event) => setNewTask(event.target.value)} />


<TextField id="outlined-basic"   className="staffBox"
            sx={{marginLeft: 5, backgroundColor: "#fce4ec",height: 55, marginTop: 3}}
            required="required" placeholder="Team Member's Name" value={completedBy}
            onChange={(event) => setCompletedBy(event.target.value)} />


<Box sx={{ minWidth: 115 }} className="completedBox" >
  <FormControl sx={{ minWidth: 155,  marginLeft: 60, marginBottom: -4, backgroundColor: "#fce4ec", marginTop: -7}}  >
    <InputLabel sx={{ marginLeft: 2, marginTop: -0}} id="demo-simple-select-label" >Completed ?</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        sx={{height: 55}}
        value={completed}
        label="Completed ?"
        onChange={(event) => setCompleted(event.target.value)}>
          <MenuItem value="N">No</MenuItem>
          <MenuItem value="Y">Yes</MenuItem>
      </Select>
  </FormControl>
</Box>
</form>

<Button 
variant="outlined"
 style={{
  backgroundColor: "#4caf50",
  height: 55,
  color: "white",
  marginLeft: 800,
  marginTop: -80,
  marginBottom: 35,
  marginLeft: 677
}}
        
onClick={(event) => { onAddTask(event) }}>Add Task</Button>




  <TableContainer component={Paper}>
    <Table sx={{ minWidth: 150, fontSize: 10, backgroundColor:'#ffcdd2', marginBottom: 10 }} aria-label="simple table">
      <TableHead>

        <TableRow>
          <TableCell align="left"> <Typography variant="h6" > TASKS </Typography></TableCell>
          <TableCell align="right"> <Typography variant="h6"> ASSIGNED STAFF </Typography> </TableCell>
          <TableCell align="right"> <Typography variant="h6"> COMPLETED STATUS </Typography></TableCell>
          <TableCell align="right"> <Typography variant="h6"> DELETE </Typography></TableCell> 
          <TableCell align="right"> <Typography variant="h6" style={{  marginRight: 60 }}> EDIT </Typography></TableCell> 
        </TableRow>

      </TableHead>
        <TableBody>
          {oneTask.map((tasks) => {
            console.log('inside MAP', tasks)
                  return ( 
                      <TableRow key={tasks.id}  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="left">{tasks.task}</TableCell>
                            <TableCell align="center">{tasks.completed_by}</TableCell>
                            <TableCell align="center">{tasks.completed}</TableCell>

                            <TableCell>
                                <Stack direction="column"alignItems="flex-end" key={tasks.id}>
                                    <Chip
                                      onDelete={() => { deleteTask(tasks.id) }}
                                      deleteIcon={<DeleteIcon style={{ color: "#ba000d", marginRight: 30 }}  />}
                                    />
                              </Stack>
                          </TableCell>

                          <TableCell>
                          <EditIcon onClick={() => onEdit(tasks) } style={{  marginLeft: 100 }}/>
                          </TableCell>

                      </TableRow>
                  )})}
              </TableBody>
      </Table>
    </TableContainer>
 



</div>
    


  )//end return




}; //end TaskPageForm***



export default TaskPageForm;