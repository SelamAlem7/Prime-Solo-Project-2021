import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import logo from './careTeamLogo.jpeg';




function Nav() {
  const user = useSelector((store) => store.user);

  return (

    <div className="nav">
      <Link to="/home">
      <img className="logo" src={logo}/>
      <h2 className="nav-title">CARE TEAM©</h2>
      </Link>

      
      
       
      <div>
        {/* If no user is logged in, show these links */}
        {user.id === null &&
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            //Login / Register
          </Link>
        }

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" role="button" to="/user">
              Home
            </Link>

            <Link className="navLink" role="button" to="/our_clients">
              Your Clients
            </Link>

            <LogOutButton className="navLink" role="button"/>
          </>
        )}

        <Link className="navLink" role="button" to="/about">
          About
        </Link>
        
      </div>
    </div>
  );
}

export default Nav;
