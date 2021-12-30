import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import AddNewClientButton from '../AddNewClientButton/AddNewClientButton';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect, useState } from 'react';



function UserPage() {
  const dispatch = useDispatch();
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const client = useSelector((store) => store.client)

  return (
    <div className="container">
      <h2>Welcome Team, {user.team_name}!</h2>
      <h3>Here are your clients:</h3>
      <ul>
      {client.map((clientInfo) => {
        return (
          <li key={clientInfo.id}> {clientInfo.user_id === user.id && clientInfo.name}
          { clientInfo.user_id === user.id }</li> //keeps log of the user ID who added client in our Database
        )
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
