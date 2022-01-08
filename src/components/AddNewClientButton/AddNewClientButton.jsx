import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router";


function AddNewClientButton(props) {
  const history = useHistory();
  
  return (
    <button
      className={props.className}
      onClick={() => history.push('/add_new_client')}
    >
      Add New Client
    </button>
  );
}

export default AddNewClientButton;
