import authReducer from './authReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore';
import { reducer as formReducer } from 'redux-form';
import { firebaseReducer } from 'react-redux-firebase';
import receiptsReducer from './receiptsReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  form: formReducer,
  receipts: receiptsReducer

});

export default rootReducer

// the key name will be the data property on the state objectimport { combineReducers } from 'redux';

