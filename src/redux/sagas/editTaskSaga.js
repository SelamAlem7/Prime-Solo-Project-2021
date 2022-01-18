import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


// Get the specified task to edit
function* fetchThisTaskToEdit(action) {
  console.log('Inside EDIT saga:', action.payload);
  try {
      const response = yield axios.put(`/api/tasks/${action.payload}`)
      console.log('Inside EDIT saga:', action.payload);
      yield put({ 
        type: 'SET_EDIT_TASK', 
        payload: response.data
      }); 
    } catch(error) { console.log('fetch This EDIT task', error)}  

}




function* editTaskSaga() {

  yield takeEvery('FETCH_THIS_TASK_TO_EDIT', fetchThisTaskToEdit);

}

export default editTaskSaga;
