import apiRequest, { api } from '../../apis/v1';
import { MESSAGE, FETCH_FOOD_ITEMS, FETCH_FOODSTOCK, UPDATE_FOODSTOCK, DELETE_FOODSTOCK, LOADING, FOOD_LOADING, ADD_ITEM_FOODSTOCK, DIALOG_LOADING, EAT_ITEM_FOODSTOCK, FETCH_NUTRITION_STATE, DELETE_MEALS, EDIT_MEAL, FETCH_MEALS } from './types';

export const fetchFoodItems = (foodName, rowIndex) => async (dispatch, getState, { getFirebase }) => {
  dispatch({ type: FOOD_LOADING });
  apiRequest({
    dispatch,
    getFirebase,
    request: {
      method: 'get',
      url: `fooditems/${foodName}`,
    },
    onSuccess: response => dispatch({ type: FETCH_FOOD_ITEMS, payload: { [ rowIndex ]: response.data } }),
  });
};

export const fetchFoodStock = (actionsOnSuccess = []) => async (dispatch, getState, { getFirebase }) => {
  apiRequest({
    loading: true,
    dispatch,
    getFirebase,
    request: {
      method: 'get',
      url: 'foodstock/items',
    },
    onSuccess: response => {
      dispatch({ type: FETCH_FOODSTOCK, payload: response.data })
      console.log(getState().nutrition);
      if(actionsOnSuccess.length)
        actionsOnSuccess.forEach(action => {
          dispatch(action);
        })
    }
  });

};

export const editFoodStockItem = (id, newValues) => async (dispatch, getState, { getFirebase }) => {
  // dispatch({type: LOADING});
  const oldFoodStockItem = getState().food.foodStock[ id ];
  const newFoodStockItem = { ...oldFoodStockItem, ...newValues }
  apiRequest({
    dispatch,
    getFirebase,
    request: {
      method: 'put',
      url: 'foodstock/items',
      payload: newFoodStockItem
    },
    onSuccess: response => dispatch({ type: UPDATE_FOODSTOCK, payload: newFoodStockItem }),
  });
};

export const deleteFoodStockItems = (idArray) => async (dispatch, getState, { getFirebase }) => {
  dispatch({ type: DIALOG_LOADING });
  apiRequest({
    dispatch,
    getFirebase,
    request: {
      method: 'delete',
      url: 'foodstock/items',
      payload: idArray
    },
    onSuccess: response => dispatch({ type: DELETE_FOODSTOCK, payload: idArray }),
  });
};

export const addFoodItem = (foodItemId, quantity, callBackOnSuccess) => async (dispatch, getState, { getFirebase }) => {
  dispatch({ type: DIALOG_LOADING });
  const itemDto = { foodItemId, quantity }
  apiRequest({
    dispatch,
    getFirebase,
    request: {
      method: 'post',
      url: 'foodstock/items/add',
      payload: itemDto
    },
    onSuccess: response => {
      dispatch({ type: FETCH_FOODSTOCK, payload: response.data });
      callBackOnSuccess();
    }
  });
};

export const eatFoodStockItem = (eatFoodStockDto = { foodItemId: null, quantity: null, cooked: false }) => async (dispatch, getState, { getFirebase }) => {
  apiRequest({
    dispatch,
    getFirebase,
    request: {
      method: 'post',
      url: 'foodstock/items/eat',
      payload: eatFoodStockDto
    },
    onSuccess: response => {
      dispatch({ type: FETCH_NUTRITION_STATE, payload: response.data });

      const oldFoodStockItem = getState().food.foodStock[ eatFoodStockDto.foodItemId ];
      const newFoodStockItem = { ...oldFoodStockItem, quantity: oldFoodStockItem.quantity ? oldFoodStockItem.quantity - eatFoodStockDto.quantity : oldFoodStockItem.quantity };
      dispatch({ type: UPDATE_FOODSTOCK, payload: newFoodStockItem });
    }
  });

};

export const fetchMeals = (mealDto) => async (dispatch, getState, { getFirebase }) => {
  apiRequest({
    loading: true,
    dispatch,
    getFirebase,
    request: {
      method: 'get',
      url: 'foodstock/meals',
    },
    onSuccess: response => {
      dispatch({ type: FETCH_MEALS, payload: response.data });
    }
  });
};

export const addMeal = (mealDto, callBackOnSuccess) => async (dispatch, getState, { getFirebase }) => {
  dispatch({ type: DIALOG_LOADING });
  apiRequest({
    dispatch,
    getFirebase,
    request: {
      method: 'post',
      url: 'foodstock/meals',
      payload: mealDto
    },
    onSuccess: response => {
      dispatch({ type: FETCH_MEALS, payload: response.data });
      callBackOnSuccess();
    },
    onError: (error) => {
      callBackOnSuccess();
    }
  });
};

export const editMeal = (mealDto, callBackOnSuccess) => async (dispatch, getState, { getFirebase }) => {
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

export const deleteMeals = (idArray) => async (dispatch, getState, { getFirebase }) => {
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