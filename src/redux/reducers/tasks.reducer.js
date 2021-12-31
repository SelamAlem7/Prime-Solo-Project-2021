const tasks = (state = [], action) => {
    switch (action.type) {
      case 'SET_TASKS':
        return action.payload;
      case 'CLEAR_TASKS':
        return [];
      default:
        return state;
    }
  }
  
  export default tasks;