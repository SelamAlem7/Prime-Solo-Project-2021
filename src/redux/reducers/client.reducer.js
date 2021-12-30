const client = (state = [], action) => {
    switch (action.type) {
      case 'SET_CLIENT':
        return action.payload;
      case 'CLEAR_CLIENT':
        return [];
      default:
        return state;
    }
  }
  
  export default client;