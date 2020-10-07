import { combineReducers } from 'redux'
import authReducer from './authReducer'
import { firestoreReducer } from 'redux-firestore';
import { reducer as formReducer } from 'redux-form';
import { firebaseReducer } from 'react-redux-firebase';
import receiptsReducer from './receiptsReducer';
import foodReducer from './foodReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  form: formReducer,
  receipts: receiptsReducer,
  foodItems: foodReducer

});

export default rootReducer

// the key name will be the data property on the state objectimport { combineReducers } from 'redux';

