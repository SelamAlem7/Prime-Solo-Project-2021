import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import AddNewClientButton from '../AddNewClientButton/AddNewClientButton';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import './UserPage.css';
import { Button, Card, CardActionArea, CardMedia, Typography, CardContent } from '@material-ui/core';
import tasksSaga from '../../redux/sagas/tasks.saga';



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
   console.log(client.id);
    dispatch({
      type: 'FETCH_THIS_TASK',
      payload: client.id
    })
    history.push('/tasks');
    
  }



  return (
    <div className="container">
      <h2>Welcome {user.team_name}!</h2>
      <h3>Here are your clients:</h3>
      <section>
      {client.map((client) => {
        return (

          <Card className="taskButton" key={client.id} onClick={e => seeClientsTask(client)} sx={{ maxWidth: 345 }}>
             Task List For
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {client.name}
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
