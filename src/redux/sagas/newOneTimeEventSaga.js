import axios from 'axios';
import { call, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* newOneTimeEventSaga(action) {
  console.log('in new one time event saga');  
  try {
    yield call( axios.post, '/api/newOneTimeEvent', action.payload);
    console.log('ran set_new_pref');
  } 
  catch (error) {
    console.log('One time event POST request failed', error);
  }
}

function* oneTimeEventSaga() {
  yield takeLatest('ADD_NEW_ONE_TIME_EVENT', newOneTimeEventSaga);
}

export default oneTimeEventSaga;