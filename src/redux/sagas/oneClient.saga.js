import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


// Get the specified movie
function* fetchThisOneClient(action) {
  try {
      const response = yield axios.get(`/api/client/${action.payload}`);
      console.log('Inside fetch one this client:', action.payload);
      yield put({ 
        type: 'SET_ONE_CLIENT', 
        payload: response.data
      }); //this works and grabs the client 
    } catch { console.log('fetch This one Client error')}  

}




function* oneClientSaga() {

  yield takeEvery('FETCH_THIS_ONE_CLIENT', fetchThisOneClient);

}

export default oneClientSaga;
