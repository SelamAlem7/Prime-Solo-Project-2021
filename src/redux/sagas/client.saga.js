import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchAllClients() {
  try {
    const clients = yield axios.get('/api/client');
    yield put({ type: 'SET_CLIENT', payload: clients.data });
  } catch (error) {
    console.log('fetchAllClients error', error);
  }
}


// Get the specified movie
function* fetchThisClient(action) {
  try {
      const clients = yield axios.get(`/api/client/${action.payload}`);
      console.log('fetch this client:', action.payload);
      yield put({ 
        type: 'SET_CLIENTS', 
        payload: clients.data 
      });
    } catch { console.log('fetchThisClient error')}       
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
  yield takeEvery('FETCH_CLIENT', fetchAllClients);
  yield takeEvery('FETCH_THIS_CLIENT', fetchThisClient);
  yield takeEvery('ADD_CLIENT', addClient);
  yield takeEvery('DELETE_CLIENT', deleteClient);
}

export default clientSaga;
