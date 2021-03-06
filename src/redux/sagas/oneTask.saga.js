import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


// Get the specified task for specified client
function* fetchThisTask(action) {
  try {
      const response = yield axios.get(`/api/tasks/${action.payload}`);
      console.log('Inside fetch ONE task:', action.payload);
      yield put({
        type: 'SET_ONE_TASK', 
        payload: response.data
      }); 
    } catch(error) { console.log('fetch This one TASK error', error)}  

}




function* oneTaskSaga() {

  yield takeEvery('FETCH_THIS_ONE_TASK', fetchThisTask);

}

export default oneTaskSaga;
