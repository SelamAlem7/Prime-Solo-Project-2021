import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router";
import ClientPage from '../ClientPage/ClientPage';

function AddNewClientButton(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  
  return (
    <button
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      className={props.className}
      onClick={() => history.push('/ClientPage')}
    >
      Add New Client
    </button>
  );
}

export default AddNewClientButton;
