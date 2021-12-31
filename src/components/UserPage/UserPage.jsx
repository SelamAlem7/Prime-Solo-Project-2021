import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import AddNewClientButton from '../AddNewClientButton/AddNewClientButton';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect} from 'react';
import { useHistory } from 'react-router-dom';






function UserPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const client = useSelector((store) => store.client)

  // TO RUN ON PAGE LOAD
  useEffect(() => {
    dispatch({ type: 'FETCH_CLIENT' })
}, [])


  return (
    <div className="container">
      <h2>Welcome Team, {user.team_name}!</h2>
      <h3>Here are your clients:</h3>
      <ul>
      {client.map((clientInfo) => {
        return (
          <li key={clientInfo.id}> {clientInfo.user_id === user.id && clientInfo.name}
          { clientInfo.user_id === user.id }
          <button onClick={() => {
            history.push('/tasks');
          }}>Go To Task List For {clientInfo.name}</button></li> //keeps log of the user ID who added client in our Database
        ) //test out conditional rendering /if statement to show clients belonging to users that added them
      })}
    </ul>

      <AddNewClientButton className="btn"  />
      {/* <p>You are caring for: {client.name}</p> */}
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
