// Used to store ONE task form the server
const oneTask = (state = [], action) => {
    switch (action.type) {
      case 'SET_ONE_TASK':
        return action.payload;
      case 'CLEAR_ONE_TASK':
          return []
      default:
        return state;
    }
  }

  
  export default oneTask;