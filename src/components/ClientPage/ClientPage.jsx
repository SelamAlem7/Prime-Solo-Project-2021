import React from 'react';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

function ClientPage() {

  const dispatch = useDispatch();

  // REDUX REDUCER
  const client = useSelector(store => store.client)//DOUBLE CHECK***
  const user = useSelector(store => store.user)



    //THESE ARE LOCAL STATES TO GRAB USERS ENTRY
    const [name, setName] = useState('');
    const [diagnosis, setDiagnosis] = useState('');


    // TO RUN ON PAGE LOAD
    useEffect(() => {
        dispatch({ type: 'FETCH_CLIENT' })
    }, [])
    

    const onAddClient = (event) => {
        event.preventDefault();
        dispatch({
        type: 'ADD_CLIENT',
        payload: {
            name: name,
            diagnosis_list: diagnosis
        }
        })
        setName('');
        setDiagnosis('');
    }

    

    function deleteClient(clientId) {
        dispatch({
          type: 'DELETE_CLIENT',
          payload: clientId
        })
      }


  return (
   

    <div>

    <h1> Add a New Client: </h1>
    <form onSubmit={onAddClient}>
      <input
        placeholder="Enter Clients Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input
        placeholder="List Clients Diagnosis"
        value={diagnosis}
        onChange={(event) => setDiagnosis(event.target.value)}
      />
      <button>Add Client</button>
    </form>

    <h2>Client</h2>
    <ul>
      {client.map((clientInfo) => {
        return (
          <li key={clientInfo.id}> {clientInfo.user_id === user.id && clientInfo.name}
          { clientInfo.user_id === user.id && <button onClick={() => { deleteClient(clientInfo.id) }}>Delete</button>}</li> //keeps log of the user ID who added client in our Database
        )
      })}
    </ul>
  </div>

    


  );
}

export default ClientPage;
