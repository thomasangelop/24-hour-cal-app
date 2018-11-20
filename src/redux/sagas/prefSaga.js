import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* setPrefSaga(action){
    console.log('in pref saga');
    // try/catch is standard JavaScript way to handle errors 
    try {
        const response = yield call(axios.get, '/api/pref' );
        yield put( { type: 'SET_PREF', payload: response.data } );
    }
    catch (error) {
        console.log('error with pref get request', error);
    }
}

// Create the rootSaga generator function
function* prefSaga() {
  yield takeEvery( 'FETCH_PREF', setPrefSaga)
}

export default prefSaga;


  
