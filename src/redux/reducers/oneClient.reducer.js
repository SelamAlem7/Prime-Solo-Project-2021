// Used to store all movies form the server
const OneClient = (state = {}, action) => {
    switch (action.type) {
      case 'SET_ONE_CLIENT':
        return action.payload;
      default:
        return state;
    }
  }

  
  export default OneClient;