import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* newEditEventSaga(action) {
  console.log('in new one time event saga');  
  try {
    yield call( axios.put, '/api/editevent', action.payload);
    yield put( {type: 'FETCH_EVENT'} );
    yield put( {type: 'SET_EDIT_EVENT'} );
  } 
  catch (error) {
    console.log('One time event PUT request failed', error);
  }
}

function* editEventSaga() {
  yield takeLatest('EDIT_EVENT', newEditEventSaga);
}

export default editEventSaga;