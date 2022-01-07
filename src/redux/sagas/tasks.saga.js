
import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


  function* fetchTasks() {
    try {

      const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      };

      const response = yield axios({
        method: 'GET',
        url: '/api/tasks', config
      })
      console.log(response.data)
      yield put({
        type: 'SET_TASKS',
        payload: response.data
      })
    } catch(err) {
      console.error('fetchTasks error', err)
    }
  }

  function* addTasks(action) {
    console.log('addTasks action:', action);
    const response = yield axios({
      method: 'POST',
      url: '/api/tasks',
      data: action.payload
    })
    yield put({ type: 'FETCH_TASKS' })
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
    yield takeEvery('FETCH_TASKS', fetchTasks);
    yield takeEvery('ADD_TASKS', addTasks); 
    yield takeEvery('DELETE_TASK', deleteTask);
}

export default tasksSaga;