import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* newPrefSaga(action) {
  console.log('in new pref saga');
  
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    console.log('made it through try in new pref saga');
    
    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    // const response = yield axios.post('api/newPref', config);

    // // now that the session has given us a user object
    // // with an id and username set the client-side user object to let
    // // the client-side code know the user is logged in
    // yield put({ type: 'SET_NEW_PREF', payload: response.data });

    yield call( axios.post, '/api/newPref', config, action.payload);
    yield put( { type: 'SET_NEW_PREF' } );
    console.log('ran set_new_pref');
    

  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* prefSaga() {
  yield takeLatest('ADD_NEW_PREF', newPrefSaga);
}

export default prefSaga;