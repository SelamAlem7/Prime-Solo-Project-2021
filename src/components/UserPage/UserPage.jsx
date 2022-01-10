import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import AddNewClientButton from '../AddNewClientButton/AddNewClientButton';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import './UserPage.css';
import { Button, Card, CardActionArea, CardMedia, Typography, CardContent } from '@material-ui/core';



function UserPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((store) => store.user);
  const client = useSelector((store) => store.client)

  // TO RUN ON PAGE LOAD
  useEffect(() => {
    dispatch({ type: 'FETCH_CLIENT' })
  }, [])

  const seeClientsTask = (client) => {
    history.push('/tasks');
    dispatch({
      type: 'FETCH_THIS_CLIENT',
      payload: client.id
    })
  }



  return (
    <div className="container">
      <h2>Welcome Team, {user.team_name}!</h2>
      <h3>Here are your clients:</h3>
      <section>
      {client.map((clientInfo) => {
        return (

          <Card className="taskButton" key={clientInfo.id} onClick={e => seeClientsTask(client)} sx={{ maxWidth: 345 }}>
             Task List For
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {clientInfo.name}
            </Typography>
          </CardContent>
          </Card>

        ) 
      })}
    </section>

      <AddNewClientButton className="btn"  />
      {/* <p>You are caring for: {client.name}</p> */}
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
