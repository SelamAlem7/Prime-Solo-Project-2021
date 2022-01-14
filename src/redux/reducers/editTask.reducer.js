// Used to store ONE client form the server
const editTask = (state = {}, action) => {
    switch (action.type) {
      case 'SET_EDIT_TASK':
        return action.payload;
      default:
        return state;
    }
  }

  
  export default editTask;