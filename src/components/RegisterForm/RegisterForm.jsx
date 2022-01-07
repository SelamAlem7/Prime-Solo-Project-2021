import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function RegisterForm() {
  const [team_name, setTeam_name] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();


  // useEffect(() => {
  //   dispatch({ type: 'REGISTER' })
  // }, []) 


  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        team_name: team_name
      },
    });
    setTeam_name(''),
    setUsername('');
    setPassword('')
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
        <div>
        <label htmlFor="team_name">
          Team Name:
          <input
            type="text"
            name="team_name"
            id="team_name"
            value={team_name}
            required
            onChange={(event) => setTeam_name(event.target.value)}
          />
        </label>
      </div>

      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;
