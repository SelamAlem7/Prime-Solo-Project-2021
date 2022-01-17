import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';



function* fetchAllTasks() {
  // get all movies from the DB
  try {
      const tasks = yield axios.get('/api/tasks');
      console.log('inside fetchAllTasks saga:', tasks.data);
      yield put({ type: 'SET_TASKS', payload: tasks.data });
  } catch {
      console.log('get all tasks error');
  }
}


function* fetchThisTask(action) {
  try {
      const response = yield axios.get(`/api/tasks/${action.payload}`);
      console.log('Inside fetch this task:', action.payload);
      yield put({ 
        type: 'SET_TASKS', 
        payload: response.data
      }); //this works and grabs the task 
    } catch { console.log('fetchThisTasks error')}  

}
 


  function* addTasks(action) {
    console.log(' THIS addTasks action:', action);
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
    console.log('inside saga deleteTask action:', action);
    const response = yield axios({
      method: 'DELETE',
      url: `/api/tasks/${action.payload.oneTask}`, //action.payload.oneClient
    })
    yield put({ 
      type: 'FETCH_THIS_ONE_TASK',
      payload: action.payload.oneClient//action.payload.oneClient
         })
  }





  function* tasksSaga() {
    yield takeEvery('FETCH_TASKS', fetchAllTasks);
    yield takeEvery('ADD_TASKS', addTasks); 
    yield takeEvery('DELETE_TASK', deleteTask);
    yield takeEvery('FETCH_THIS_TASK', fetchThisTask);
}

export default tasksSaga;