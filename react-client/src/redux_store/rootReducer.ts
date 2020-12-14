import { combineReducers } from 'redux'
import authReducer from './auth_store/authReducer'
import { firestoreReducer } from 'redux-firestore';
import { reducer as formReducer } from 'redux-form';
import { firebaseReducer } from 'react-redux-firebase';
import receiptsReducer from './receipt_store/receiptsReducer';
import foodReducer from './food_store/foodReducer';
import feedbackReducer from './feedback_store/feedbackReducer';
import nutritionReducer from './nutrition_store/nutritionReducer';
import {SIGNOUT_SUCCESS} from './auth_store/authTypes'

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

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer

// the key name will be the data property on the state objectimport { combineReducers } from 'redux';

