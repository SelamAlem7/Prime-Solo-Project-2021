import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchClient(action) {
  try {
    const response = yield axios({
      method: 'GET',
      url: '/api/client'
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


function* clientSaga() {
  yield takeEvery('FETCH_CLIENT', fetchClient);
  yield takeEvery('ADD_CLIENT', addClient);
}

export default clientSaga;
