import { combineReducers } from 'redux'
import authReducer from './authReducer'
import { firestoreReducer } from 'redux-firestore';
import { reducer as formReducer } from 'redux-form';
import { firebaseReducer } from 'react-redux-firebase';
import receiptsReducer from './receiptsReducer';
import foodReducer from './foodReducer';
import feedbackReducer from './feedbackReducer';
import nutritionReducer from './nutritionReducer';
import {SIGNOUT_SUCCESS} from '../actions/types'

const appReducer = combineReducers({
  auth: authReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  form: formReducer,
  receipts: receiptsReducer,
  food: foodReducer,
  feedback: feedbackReducer,
  nutrition: nutritionReducer

});

const rootReducer = (state, action) => {
  if(action.type ===  SIGNOUT_SUCCESS){
    state = {};
  }
  return appReducer(state, action);
}

export default rootReducer

// the key name will be the data property on the state objectimport { combineReducers } from 'redux';

