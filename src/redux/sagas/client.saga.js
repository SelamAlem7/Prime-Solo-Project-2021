import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchClient(action) {
  try {
    
 const response = yield axios({
      method: 'GET',
      url: '/api/client',
      data: action.payload
    })
    console.log(response.data)
    yield put({
      type: 'SET_CLIENT',
      payload: response.data
    })
  } catch(err) {
    console.error('fetchClient error', err)
  }
}

function* addClient(action) {
  console.log('addClient action:', action);
  const response = yield axios({
    method: 'POST',
    url: '/api/client',
    data: action.payload
  })
  yield put({ type: 'FETCH_CLIENT' })
}

function* deleteClient(action) {
  console.log('deleteClient action:', action);
  const response = yield axios({
    method: 'DELETE',
    url: `/api/client/${action.payload}`,
  })
  yield put({ type: 'FETCH_CLIENT' })
}


function* clientSaga() {
  yield takeEvery('FETCH_CLIENT', fetchClient);
  yield takeEvery('ADD_CLIENT', addClient);
  yield takeEvery('DELETE_CLIENT', deleteClient);
}

export default clientSaga;
