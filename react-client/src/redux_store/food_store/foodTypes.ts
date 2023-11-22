import { FoodStockDto, WholeFoodDto, MealDto, NutritionStateDto, FoodHistoryDto } from "../../apis/dtos/serverDtos";
import { ClearMessageAction, DIALOG_LOADING } from "../feedback_store/feedbackTypes";
import {IdMap} from '../sharedTypes';
//TYPE CONSTANTS
export const FOOD_LOADING = "FOOD_LOADING";

export const FETCH_FOOD_ITEMS = 'FETCH_FOOD_ITEMS';
export const CLEAR_FOOD_ITEMS = 'CLEAR_FOOD_ITEMS';
export const DELETE_SEARCH_ROW = 'DELETE_SEARCH_ROW';

export const ADD_RECEIPT_ITEMS_TO_FOODSTOCK = 'ADD_RECEIPT_ITEMS_TO_FOODSTOCK';
export const FETCH_FOODSTOCK = 'FETCH_FOODSTOCK';
export const EDIT_FOODSTOCK = 'EDIT_FOODSTOCK';
export const DELETE_FOODSTOCK = 'DELETE_FOODSTOCK';
export const EAT_ITEM_FOODSTOCK = 'EAT_ITEM_FOODSTOCK';

export const EDIT_MEAL = 'EDIT_MEAL';
export const FETCH_MEALS = 'FETCH_MEALS';
export const DELETE_MEAL = 'DELETE_MEAL';
export const FETCH_MEAL_NUTRITION = 'FETCH_MEAL_NUTRITION';


export const FETCH_FOOD_HISTORY = 'FETCH_FOOD_HISTORY';

export interface FoodLoadingAction {
  type: typeof FOOD_LOADING | typeof DIALOG_LOADING;
}

//FOOD ITEMS
interface FetchFoodItemsAction {
  type: typeof FETCH_FOOD_ITEMS;
  payload: IdMap<WholeFoodDto[]>;
}
interface ClearFoodItemsAction {
  type: typeof CLEAR_FOOD_ITEMS;
}
interface DeleteSearchRowAction {
  type: typeof DELETE_SEARCH_ROW;
  payload: number;
}
export type FoodItemsActions = FetchFoodItemsAction | ClearFoodItemsAction | FoodLoadingAction | DeleteSearchRowAction;

//FOOD STOCK
interface FetchFoodStockAction {
  type: typeof FETCH_FOODSTOCK;
  payload: FoodStockDto[];
}
interface EditFoodStockAction{
  type: typeof EDIT_FOODSTOCK;
  payload: FoodStockDto;
}
interface DeleteFoodStockAction {
  type: typeof DELETE_FOODSTOCK;
  payload: number[];
}
export type FoodStockActions = DeleteFoodStockAction | EditFoodStockAction | FetchFoodStockAction | FoodLoadingAction;

//MEALS
interface FetchMealsAction {
  type: typeof FETCH_MEALS;
  payload: MealDto[];
}
interface EditMealAction {
  type: typeof EDIT_MEAL;
  payload:MealDto;
}
interface DeleteMealsAction {
  type: typeof DELETE_MEAL;
  payload: number;
}
interface FetchMealNutritionAction {
  type: typeof FETCH_MEAL_NUTRITION;
  payload: NutritionStateDto;
}

export type MealsActions = DeleteMealsAction | EditMealAction | FetchMealsAction | FoodLoadingAction | ClearMessageAction | FetchMealNutritionAction;

//HISTORY
export type FetchFoodHistory = {
  type: typeof FETCH_FOOD_HISTORY;
  payload: FoodHistoryDto[];
}


//FOOD
export type FoodActionTypes = FoodStockActions | MealsActions | FoodItemsActions | FetchFoodHistory;