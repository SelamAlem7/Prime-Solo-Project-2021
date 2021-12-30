import React from 'react';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

function ClientPage() {

  const dispatch = useDispatch();

  // REDUX REDUCER
  const client = useSelector(store => store.client)//DOUBLE CHECK***
  const user = useSelector(store => store.user)



  return (
    <h1> All About Client </h1>
  );
}

export default ClientPage;
