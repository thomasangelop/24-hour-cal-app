import axios from 'axios';
import { call, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* newPrefSaga(action) {
  console.log('in new pref saga');  
  try {
    yield call( axios.post, '/api/newPref', action.payload);
    console.log('ran set_new_pref');
  } 
  catch (error) {
    console.log('User get request failed', error);
  }
}

function* prefSaga() {
  yield takeLatest('ADD_NEW_PREF', newPrefSaga);
}

export default prefSaga;