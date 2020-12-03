import { EatFoodDto, FoodItemDto, FoodStockDto, MealDto } from '../../apis/dtos/foodDtos';
import apiRequest from '../../apis/v1';
import { FETCH_FOOD_ITEMS, FETCH_FOODSTOCK, EDIT_FOODSTOCK, DELETE_FOODSTOCK, FOOD_LOADING, DIALOG_LOADING, FETCH_NUTRITION_STATE, DELETE_MEALS, EDIT_MEAL, FETCH_MEALS, FoodActionTypes, LoadingAction, FetchNutritionStateAction, FoodItemsActions, FoodStockActions, MealsActions } from './types';

export const fetchFoodItems = (foodName, rowIndex) => async (dispatch: (arg0: FoodItemsActions) => void, _getState: any, { getFirebase }: any) => {
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



export const fetchFoodStock = (actionsOnSuccess = []) => async (dispatch: (arg0: FoodStockActions) => any, getState, { getFirebase }) => {
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

export const editFoodStockItem = (newFoodStockItem: FoodStockDto) => async (dispatch: (arg0: FoodStockActions) => any, _getState, { getFirebase }) => {
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

export const deleteFoodStockItems = (idArray: number[]) => async (dispatch: (arg0: FoodStockActions) => any, _getState, { getFirebase }) => {
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

export const addFoodStockItem = (foodItemId, quantity, callBackOnSuccess) => async (dispatch: (arg0: FoodStockActions) => any, _getState, { getFirebase }) => {
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

export const eatFoodStockItem = (eatFoodDto: EatFoodDto) => async (dispatch: (arg0: FoodStockActions | FetchNutritionStateAction) => any, getState, { getFirebase }) => {
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

      const oldFoodStockItem = getState().food.foodStock[ eatFoodDto.foodId ];
      const newFoodStockItem: FoodStockDto = { ...oldFoodStockItem, quantity: oldFoodStockItem.quantity ? oldFoodStockItem.quantity - eatFoodDto.quantity : oldFoodStockItem.quantity };
      dispatch({ type: EDIT_FOODSTOCK, payload: newFoodStockItem });
    }
  });

};

export const fetchMeals = () => async (dispatch: (arg0: MealsActions) => void, _getState: any, { getFirebase }: any) => {
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

export const addMeal = (mealDto: MealDto, callBackOnSuccess: () => void ) => async (dispatch: (arg0: MealsActions) => void, _getState, { getFirebase }) => {
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


export const editMeal = (mealDto: MealDto, callBackOnSuccess: () => void) => async (dispatch: (arg0: MealsActions) => void, _getState, { getFirebase }) => {
  dispatch({ type: DIALOG_LOADING });
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

export const deleteMeals = (idArray: number[]) => async (dispatch: (arg0: MealsActions) => void, _getState, { getFirebase }) => {
  dispatch({ type: DIALOG_LOADING });
  apiRequest({
    dispatch,
    getFirebase,
    request: {
      method: 'delete',
      url: 'foodstock/meals',
      payload: idArray
    },
    onSuccess: () => dispatch({ type: DELETE_MEALS, payload: idArray }),
  });
};