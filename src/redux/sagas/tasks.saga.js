import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';



function* fetchAllTasks() {
  // get all movies from the DB
  try {
      const tasks = yield axios.get('/api/tasks');
      console.log('get all:', tasks.data);
      yield put({ type: 'SET_TASKS', payload: tasks.data });
  } catch {
      console.log('get all tasks error');
  }
}


  function* fetchThisTask(action) {
    try {
        const tasks = yield axios.get(`/api/tasks/${action.payload}`);
        console.log('get all:', action.payload);
        yield put({ type: 'SET_TASKS', payload: tasks.data });
    } catch {
        console.log('get all error');
    }       
}



  // function* addTasks(action) {
  //   console.log('addTasks action:', action);
  //   const response = yield axios({
  //     method: 'POST',
  //     url: '/api/tasks',
  //     data: action.payload
  //   })
  //   yield put({ type: 'FETCH_TASKS' })
  // } 


  function* addTasks(action) {
    console.log('addTasks action:', action);
    try {
        axios({
            method: 'POST',
            url: '/api/tasks',
            data: action.payload
        })
        yield put ({ type: 'FETCH_TASKS'})
    } catch {
        console.log('POST error');
    }
  } 



  function* deleteTask(action) {
    console.log('deleteTask action:', action);
    const response = yield axios({
      method: 'DELETE',
      url: `/api/tasks/${action.payload}`,
    })
    yield put({ type: 'FETCH_TASKS' })
  }





  function* tasksSaga() {
    yield takeEvery('FETCH_TASKS', fetchAllTasks);
    yield takeEvery('ADD_TASKS', addTasks); 
    yield takeEvery('DELETE_TASK', deleteTask);
    yield takeEvery('FETCH_THIS_TASK', fetchThisTask);
}

export default tasksSaga;