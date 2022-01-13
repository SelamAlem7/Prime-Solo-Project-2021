// Used to store all movies form the server
const oneTask = (state = [], action) => {
    switch (action.type) {
      case 'SET_ONE_TASK':
    return action.payload
      default:
        return state;
    }
  }

  
  export default oneTask;