
import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';



function* addTasks(action) {
    console.log('addTasks action:', action);
    const response = yield axios({
      method: 'POST',
      url: '/api/tasks',
      data: action.payload
    })
    yield put({ type: 'FETCH_TASKS' })
  } 



  function* fetchTasks(action) {
    try {
      const response = yield axios({
        method: 'GET',
        url: '/api/tasks'
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


  function* tasksSaga() {
    yield takeEvery('ADD_TASKS', addTasks);
    yield takeEvery('FETCH_TASKS', fetchTasks);
    
}

export default tasksSaga;