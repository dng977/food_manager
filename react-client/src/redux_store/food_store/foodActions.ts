import { EatFoodDto, FoodItemDto, FoodStockDto, MealDto, NutritionStateDto } from '../../apis/dtos/serverDtos';
import apiRequest from '../../apis/v1';
import {ThunkAction} from 'redux-thunk';
import { RootState } from '../rootReducer';
import { ExtendedFirebaseInstance } from 'react-redux-firebase';
import { DIALOG_LOADING } from '../feedback_store/feedbackTypes';
import { FetchNutritionStateAction, FETCH_NUTRITION_STATE } from '../nutrition_store/nutritionTypes';
import { FoodItemsActions, FOOD_LOADING, FETCH_FOOD_ITEMS, FoodStockActions, FETCH_FOODSTOCK, EDIT_FOODSTOCK, DELETE_FOODSTOCK, MealsActions, FETCH_MEALS, EDIT_MEAL, DELETE_MEAL } from './foodTypes';
import { AppThunk, AppThunkDispatch } from '../sharedTypes';
import { getHeapStatistics } from 'v8';
export const fetchFoodItems = (foodName, rowIndex) : AppThunk<FoodItemsActions> => async (dispatch, _getState, getFirebase) => {
  dispatch({ type: FOOD_LOADING });
  apiRequest({
    dispatch,
    getFirebase,
    request: {
      method: 'get',
      url: `fooditems/${foodName}`,
    },
    onSuccess: (response: { data: FoodItemDto[]; }) => dispatch({ type: FETCH_FOOD_ITEMS, payload: {[ rowIndex ]: response.data}}),
  });
};



export const fetchFoodStock = (actionsOnSuccess = [] as any[]) : AppThunk<FoodStockActions> => async (dispatch, getState, getFirebase) => {
  apiRequest({
    loading: true,
    dispatch,
    getFirebase,
    request: {
      method: 'get',
      url: 'foodstock/items',
    },
    onSuccess: (response: { data: FoodStockDto[]; }) => {
      dispatch({ type: FETCH_FOODSTOCK, payload: response.data })
      console.log(getState().nutrition);
      if(actionsOnSuccess.length)
        actionsOnSuccess.forEach(action => {
          dispatch(action);
        })
    }
  });

};

export const editFoodStockItem = (newFoodStockItem: FoodStockDto) : AppThunk<FoodStockActions> => async (dispatch, getState, getFirebase) => {
  // dispatch({type: LOADING});
  apiRequest({
    dispatch,
    getFirebase,
    request: {
      method: 'put',
      url: 'foodstock/items',
      payload: newFoodStockItem
    },
    onSuccess: () => dispatch({ type: EDIT_FOODSTOCK, payload: newFoodStockItem }),
  });
};

export const deleteFoodStockItems = (idArray: number[]) : AppThunk<FoodStockActions> => async (dispatch, getState, getFirebase) => {
  dispatch({ type: DIALOG_LOADING });
  apiRequest({
    dispatch,
    getFirebase,
    request: {
      method: 'delete',
      url: 'foodstock/items',
      payload: idArray
    },
    onSuccess: () => dispatch({ type: DELETE_FOODSTOCK, payload: idArray }),
  });
};

export const addFoodStockItem = (foodItemId, quantity, callBackOnSuccess) : AppThunk<FoodStockActions> => async (dispatch, getState, getFirebase) => {
  dispatch({ type: DIALOG_LOADING });
  const itemDto: FoodStockDto = {foodItemDto: {id:foodItemId},quantity};
  apiRequest({
    dispatch,
    getFirebase,
    request: {
      method: 'post',
      url: 'foodstock/items/add',
      payload: itemDto
    },
    onSuccess: (response: {data: FoodStockDto[]}) => {
      dispatch({ type: FETCH_FOODSTOCK, payload: response.data });
      callBackOnSuccess();
    }
  });
};

export const eatFoodStockItem = (eatFoodDto: EatFoodDto) : AppThunk<FoodStockActions | FetchNutritionStateAction> => async (dispatch, getState, getFirebase) => {
  apiRequest({
    dispatch,
    getFirebase,
    request: {
      method: 'post',
      url: 'foodstock/items/eat',
      payload: eatFoodDto
    },
    onSuccess: (response: { data: any; }) => {
      dispatch({ type: FETCH_NUTRITION_STATE, payload: response.data });

      const oldFoodStockItem: FoodStockDto = getState().food.foodStock[ eatFoodDto.foodId ];
      const newFoodStockItem: FoodStockDto = { ...oldFoodStockItem, quantity: oldFoodStockItem.quantity ? oldFoodStockItem.quantity - eatFoodDto.quantity : oldFoodStockItem.quantity };
      dispatch({ type: EDIT_FOODSTOCK, payload: newFoodStockItem });
    }
  });

};

export const fetchMeals = () : AppThunk<MealsActions> => async (dispatch, getState, getFirebase) => {
  apiRequest({
    loading: true,
    dispatch,
    getFirebase,
    request: {
      method: 'get',
      url: 'foodstock/meals',
    },
    onSuccess: (response: { data: MealDto[]; }) => {
      dispatch({ type: FETCH_MEALS, payload: response.data });
    }
  });
};

export const addMeal = (mealDto: MealDto, callBackOnSuccess: () => void ) : AppThunk<MealsActions> => async (dispatch, getState, getFirebase) => {
  dispatch({ type: DIALOG_LOADING });
  apiRequest({
    dispatch,
    getFirebase,
    request: {
      method: 'post',
      url: 'foodstock/meals',
      payload: mealDto
    },
    onSuccess: (response: { data: MealDto[]; }) => {
      dispatch({ type: FETCH_MEALS, payload: response.data });
      callBackOnSuccess();
    },
    onError: () => {
      callBackOnSuccess();
    }
  });
};


export const editMeal = (mealDto: MealDto, callBackOnSuccess: () => void) : AppThunk<MealsActions> => async (dispatch, getState, getFirebase) => {
  //dispatch({ type: DIALOG_LOADING });
  apiRequest({
    dispatch,
    getFirebase,
    request: {
      method: 'put',
      url: 'foodstock/meals',
      payload: mealDto
    },
    onSuccess: () => {
      dispatch({ type: EDIT_MEAL, payload: mealDto });
      callBackOnSuccess();
    }
  });
};

export const deleteMeal = (id: number) : AppThunk<MealsActions> => async (dispatch, getState, getFirebase) => {
  dispatch({ type: DIALOG_LOADING });
  apiRequest({
    dispatch,
    getFirebase,
    request: {
      method: 'delete',
      url: `foodstock/meals/${id}`,
    },
    onSuccess: () => dispatch({ type: DELETE_MEAL, payload: id }),
  });
};

export const eatMeal = (eatFoodDto: EatFoodDto) : AppThunk<MealsActions | FetchNutritionStateAction> => async (dispatch, getState, getFirebase) => {
  apiRequest({
    dispatch,
    getFirebase,
    request: {
      method: 'post',
      url: 'foodstock/meals/eat',
      payload: eatFoodDto
    },
    onSuccess: (response: { data: NutritionStateDto; }) => {
      dispatch({ type: FETCH_NUTRITION_STATE, payload: response.data });

      const oldMeal: MealDto = getState().food.meals[ eatFoodDto.foodId ];
      const newMeal: MealDto = { ...oldMeal, quantityLeft: oldMeal.quantityLeft - eatFoodDto.quantity };
      dispatch({ type: EDIT_MEAL, payload: newMeal });
    }
  });
}