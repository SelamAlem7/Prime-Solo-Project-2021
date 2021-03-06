import React from 'react';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const client = useSelector(store => store.client)//DOUBLE CHECK***
  const user = useSelector(store => store.user)


  useEffect(() => {
    dispatch({ type: 'FETCH_CLIENT' })
}, [])


  return (
    <div className="container">
      <h2>List of Your Clients</h2>
      
      <ul>
        {client.map((client) => {
        return (
            <Stack direction="row" spacing={2} sx={{ '& button': { m: 1 } }} >
              <Button variant="outlined" size="large" variant="contained"> {client.name}</Button>
            </Stack>

        )})};
      </ul>
      
    </div>
  );
}

export default InfoPage;
