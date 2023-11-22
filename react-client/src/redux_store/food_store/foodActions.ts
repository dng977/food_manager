import { EatFoodDto, WholeFoodDto, FoodStockDto, MealDto, NutritionStateDto, FoodHistoryDto } from '../../apis/dtos/serverDtos';
import apiRequest from '../../apis/v1';
import { CLEAR_MESSAGE, DIALOG_LOADING, LoadingActions, POP_LOADING } from '../feedback_store/feedbackTypes';
import { FetchNutritionStateAction, FETCH_NUTRITION_STATE } from '../nutrition_store/nutritionTypes';
import { FoodItemsActions, FOOD_LOADING, FETCH_FOOD_ITEMS, FoodStockActions, FETCH_FOODSTOCK, EDIT_FOODSTOCK, DELETE_FOODSTOCK, MealsActions, FETCH_MEALS, EDIT_MEAL, DELETE_MEAL, FETCH_MEAL_NUTRITION, FETCH_FOOD_HISTORY, FetchFoodHistory } from './foodTypes';
import { AppThunk } from '../sharedTypes';
import { base64ToBlob, blobToBase64 } from '../../util/util';
export const fetchFoodItems = (foodName, rowIndex) : AppThunk<FoodItemsActions> => async (dispatch, _getState, getFirebase) => {
  dispatch({ type: FOOD_LOADING });
  apiRequest({
    dispatch,
    getFirebase,
    request: {
      method: 'get',
      url: `wholefood/${foodName}`,
    },
    onSuccess: (response: { data: WholeFoodDto[]; }) => dispatch({ type: FETCH_FOOD_ITEMS, payload: {[ rowIndex ]: response.data}}),
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
  const itemDto: FoodStockDto = {wholeFoodDto: {id:foodItemId},quantity};
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
      dispatch(fetchFoodHistory(5));

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
      url: 'meals',
    },
    onSuccess: (response: { data: MealDto[]; }) => {
      response.data.forEach(element => {
        if(element.imageBytes) element.imageBytes = base64ToBlob(element.imageBytes);
      });
      dispatch({ type: FETCH_MEALS, payload: response.data });
    }
  });
};

export const addMeal = (mealDto: MealDto, mealImage: Blob, callBackOnSuccess: () => void ) : AppThunk<MealsActions> => async (dispatch, getState, getFirebase) => {
  dispatch({ type: DIALOG_LOADING });
  let payloadData = new FormData();
  payloadData.append('mealImage', mealImage);
  payloadData.append("mealDto",new Blob([JSON.stringify(mealDto)],{type: "application/json"}));
  apiRequest({
    dispatch,
    getFirebase,
    request: {
      method: 'post',
      url: 'meals',
      payload: payloadData,
      // otherHeaders: {"Content-Type": "multipart/form-data" }
    },
    onSuccess: (response: { data: MealDto[]; }) => {
      response.data.forEach(element => {
        if(element.imageBytes) element.imageBytes = base64ToBlob(element.imageBytes);
      });
      dispatch({ type: FETCH_MEALS, payload: response.data });
      callBackOnSuccess();
    },
    onError: () => {
      dispatch({type: CLEAR_MESSAGE});
    }
  });
};


export const editMeal = (mealDto: MealDto, mealImage: Blob, callBackOnSuccess: () => void) : AppThunk<MealsActions> => async (dispatch, getState, getFirebase) => {
  dispatch({ type: DIALOG_LOADING });
  let payloadData = new FormData();
  payloadData.append('mealImage', mealImage);
  payloadData.append("mealDto",new Blob([JSON.stringify(mealDto)],{type: "application/json"}));
  apiRequest({
    dispatch,
    getFirebase,
    request: {
      method: 'put',
      url: 'meals',
      payload: payloadData
    },
    onSuccess: () => {
        if(mealImage)
          mealDto.imageBytes = mealImage;
        dispatch({ type: EDIT_MEAL, payload: mealDto });
        callBackOnSuccess();
    },
    onError: (error) => {
      console.log(error);
    }
  });
};

export const deleteMeal = (id: number, callBack: () => void) : AppThunk<MealsActions> => async (dispatch, getState, getFirebase) => {
  dispatch({ type: DIALOG_LOADING });
  apiRequest({
    dispatch,
    getFirebase,
    request: {
      method: 'delete',
      url: `meals/${id}`,
    },
    onSuccess: () => {
      callBack();

      dispatch({ type: DELETE_MEAL, payload: id });
    }
  });
};

export const eatMeal = (eatFoodDto: EatFoodDto) : AppThunk<MealsActions | FetchNutritionStateAction> => async (dispatch, getState, getFirebase) => {
  apiRequest({
    dispatch,
    getFirebase,
    request: {
      method: 'post',
      url: 'meals/eat',
      payload: eatFoodDto
    },
    onSuccess: (response: { data: NutritionStateDto; }) => {
      dispatch({ type: FETCH_NUTRITION_STATE, payload: response.data });

      const oldMeal: MealDto = getState().food.meals[ eatFoodDto.foodId ];
      const newMeal: MealDto = { ...oldMeal, quantityLeft: oldMeal.quantityLeft - eatFoodDto.quantity };
      dispatch({ type: EDIT_MEAL, payload: newMeal });

      dispatch(fetchFoodHistory(5));


    }
  });
}

export const fetchMealNutrition = (id: number) : AppThunk<MealsActions | FetchNutritionStateAction | LoadingActions> => async (dispatch, getState, getFirebase) => {
  console.log("fetchMealNutrition: ", id);
  apiRequest({
    dispatch,
    getFirebase,
    request: {
      method: 'get',
      url: `meals/${id}/nutrition`,
    },
    onSuccess: (response: { data: NutritionStateDto }) => {
      dispatch({type: FETCH_MEAL_NUTRITION, payload: response.data });
    }
  });
}

export const fetchFoodHistory = (daysAgo: number) : AppThunk<FetchFoodHistory | LoadingActions> => async (dispatch, getState, getFirebase) => {
  console.log("fetchFoodHistory: ", daysAgo);
  apiRequest({
    dispatch,
    getFirebase,
    request: {
      method: 'get',
      url: `foodhistory/${daysAgo}`,
    },
    onSuccess: (response: { data: FoodHistoryDto[] }) => {
      response.data.forEach(element => {
        if(element.imageBytes) element.imageBytes = base64ToBlob(element.imageBytes);
      });
      dispatch({type: FETCH_FOOD_HISTORY, payload: response.data });
    }
  });

}