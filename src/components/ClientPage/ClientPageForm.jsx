import React from 'react';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Card, CardActionArea, CardMedia, Typography, CardContent } from "@material-ui/core";
import background from './ClientPage.jpeg';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
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

import './ClientPage.css';

function ClientPageForm() {

  const dispatch = useDispatch();

  // REDUX REDUCER
  const client = useSelector(store => store.client)//DOUBLE CHECK***
  const user = useSelector(store => store.user)



    //THESE ARE LOCAL STATES TO GRAB USERS ENTRY
    const [name, setName] = useState('');
    const[id, setId] = useState('')

    // TO RUN ON PAGE LOAD
    useEffect(() => {
        dispatch({ type: 'FETCH_CLIENT' })
    }, [])
    

    const onAddClient = (event) => {
        event.preventDefault();
        dispatch({
        type: 'ADD_CLIENT',
        payload: {
            name: name
        }
        })
        setName('');
    }

    

    function deleteClient(clientId) {
        dispatch({
          type: 'DELETE_CLIENT',
          payload: clientId
        })
      }


  return (
   

    <div>
      
      
      
     

    <h3> Add a New Client: </h3>
    <form onSubmit={onAddClient}>
      
        {/* <input
          placeholder="New Clients Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        /> */}


    <TextField id="standard-basic" label="Enter New Client" variant="standard"     value={name}
          onChange={(event) => setName(event.target.value)}
          sx={{ marginBottom: 4, marginLeft: 1}}/>




      <Button 
        variant="outlined"
        style={{
          backgroundColor: "#4caf50",
          height: 25,
          color: "white",
          marginTop: 20,
          marginLeft: 5,
          marginBottom: 8}} 
          onClick={(event) => { onAddTask(event) }}>Add New Client
      </Button>
            </form>



    {/* <h2>Clients</h2> */}
    

      {/* <ul>
      {client.map((clientInfo) => {
        return (
          <li key={clientInfo.id}> 
          {clientInfo.name} 
          <button className="delete_btn" onClick={() => { deleteClient(clientInfo.id) }}>Delete</button> </li> //keeps log of the clients
        )
      })}
    </ul> */}
       
 

   
    <TableContainer component={Paper} sx={{minWidth: 500, maxWidth:570, marginBottom: 5.2}}>
    <Table sx={{minWidth: 700, maxWidth:700,  fontSize: 10, backgroundColor:'#f8bbd0', marginBottom: 10 }} aria-label="simple table">
      <TableHead>

        <TableRow>
          <TableCell align="left"> <Typography variant="h6" > LIST OF CLIENTS </Typography></TableCell>
          <TableCell align="left"> <Typography variant="h6" > DELETE CLIENT </Typography></TableCell>
        </TableRow>

      </TableHead>
        <TableBody >
        {client.map((clientInfo) => {
                return (
                      <TableRow key={clientInfo.id}  sx={{ border: 2,  }}>
                            <TableCell align="left">{clientInfo.name} </TableCell>
                          

                            <TableCell>
                                <Stack key={clientInfo.id}>
                                    <Chip
                                    sx={{ marginRight: 30  }}
                                      onDelete={() => { deleteClient(clientInfo.id) }}
                                      deleteIcon={<DeleteIcon style={{ color: "#ba000d"}}  />}
                                    />
                              </Stack>
                          </TableCell>

                          {/* <TableCell>
                          <EditIcon onClick={() => onEdit(tasks) } style={{  marginLeft: 100 }}/>
                          </TableCell> */}

                      </TableRow>
                  )})}
              </TableBody>
      </Table>
    </TableContainer>

   
   
   
   
   
  <img src={background}  class="pic"/>
  </div>

    


  );
}

export default ClientPageForm;
