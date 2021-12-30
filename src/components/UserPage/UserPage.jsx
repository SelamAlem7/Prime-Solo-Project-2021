import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import AddClientButton from '../AddClientButton/AddClientButton';
import {useSelector} from 'react-redux';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h2>Welcome Team, {user.team_name}!</h2>
      <AddClientButton />
      {/* <p>You are caring for: {client.name}</p> */}
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
