import { FetchActivityFactorsAction, FetchNutritionRdaAction, FetchNutritionStateAction, FETCH_ACTIVITY_FACTORS, FETCH_NUTRITION_RDA, FETCH_NUTRITION_STATE, UpdateUserStateAction, UPDATE_USER_STATE } from "./nutritionTypes";
import apiRequest, {api} from '../../apis/v1';

import { sendUserDataToServer } from "../auth_store/authActions";
import { SubmissionError } from "redux-form";
import { LOADING, LoadingActions, POP_LOADING } from "../feedback_store/feedbackTypes";
import { AppThunk } from "../sharedTypes";
import { NutritionRdaDto } from "../../apis/dtos/serverDtos";
import { FoodLoadingAction } from "../food_store/foodTypes";
import { number } from "../../components/auth/validators";

export const fetchActivityFactors = () : AppThunk<FetchActivityFactorsAction> => async (dispatch , getState, getFirebase) => {
  apiRequest({
    dispatch,
    getFirebase,
    request: {
      method: 'get',
      url: 'nutrition/activity',
    },
    onSuccess: response => dispatch({type: FETCH_ACTIVITY_FACTORS, payload: response.data}),
  })
};

export const fetchNutritionState = () : AppThunk<FetchNutritionStateAction> => async (dispatch , getState, getFirebase) => {
  apiRequest({
    loading: true,
    dispatch,
    getFirebase,
    request: {
      method: 'get',
      url: 'nutrition/state',
    },
    onSuccess: response => dispatch({type: FETCH_NUTRITION_STATE, payload: response.data}),
  });
};

export const fetchNutritionRda = () : AppThunk<FetchNutritionRdaAction> => async (dispatch , getState, getFirebase) => {
  apiRequest({
    loading: true,
    dispatch,
    getFirebase,
    request: {
      method: 'get',
      url: 'nutrition/rda',
    },
    onSuccess: (response: {data: NutritionRdaDto}) => {
      dispatch({type: FETCH_NUTRITION_RDA, payload: response.data});
    },
  });
};
function getId(x: string|null){
  if(x !== null)
    console.log(x.length);
}

export const sendUserData = (formProps: { male: string; activityFactor: string; }) : AppThunk<UpdateUserStateAction | LoadingActions> =>  async (dispatch , getState, getFirebase) => {
  dispatch({type: LOADING});
  let userDto = {...formProps,male: formProps.male === "male" ? true: false,  activityFactor: formProps.activityFactor.split(':')[0]};
  return new Promise((resolve, reject) => {
    const firebase = getFirebase();
    if(firebase.auth().currentUser){
      firebase.auth().currentUser?.getIdToken(true).then( async (idToken) => {
        return sendUserDataToServer(idToken, userDto).then( () => {
          dispatch({type: UPDATE_USER_STATE});
          
          // dispatch({type: POP_LOADING});
        });
      }).catch((error) => {
        console.log(error.message);
        reject(new SubmissionError({_error: error.message}));
        dispatch({type: POP_LOADING});
  
      });
    }else{
      reject(new SubmissionError({_error: "FIREBASE ERROR - currentUser is null"}))
    }


  });

};