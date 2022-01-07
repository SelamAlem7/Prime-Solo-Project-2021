import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchClient(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/client', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_CLIENT', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
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
