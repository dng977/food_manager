import { FoodStockDto, FoodItemDto, MealDto, NutritionStateDto } from "../../apis/dtos/serverDtos";
import { DIALOG_LOADING } from "../feedback_store/feedbackTypes";
import { FETCH_NUTRITION_STATE } from "../nutrition_store/dist/nutritionTypes";
import { EditReceiptItemAction } from "../receipt_store/receiptTypes";
import {IdMap} from '../sharedTypes';
//TYPE CONSTANTS
export const FOOD_LOADING = "FOOD_LOADING";

export const FETCH_FOOD_ITEMS = 'FETCH_FOOD_ITEMS';
export const CLEAR_FOOD_ITEMS = 'CLEAR_FOOD_ITEMS';

export const ADD_RECEIPT_ITEMS_TO_FOODSTOCK = 'ADD_RECEIPT_ITEMS_TO_FOODSTOCK';
export const FETCH_FOODSTOCK = 'FETCH_FOODSTOCK';
export const EDIT_FOODSTOCK = 'EDIT_FOODSTOCK';
export const DELETE_FOODSTOCK = 'DELETE_FOODSTOCK';
export const EAT_ITEM_FOODSTOCK = 'EAT_ITEM_FOODSTOCK';

export const EDIT_MEAL = 'EDIT_MEAL';
export const FETCH_MEALS = 'FETCH_MEALS';
export const DELETE_MEAL = 'DELETE_MEAL';



export interface FoodLoadingAction {
  type: typeof FOOD_LOADING | typeof DIALOG_LOADING;
}

//FOOD ITEMS
interface FetchFoodItemsAction {
  type: typeof FETCH_FOOD_ITEMS;
  payload: IdMap<FoodItemDto[]>;
}

//FOOD STOCK
export type FoodItemsActions = FetchFoodItemsAction | FoodLoadingAction;
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

export type MealsActions = DeleteMealsAction | EditMealAction | FetchMealsAction | FoodLoadingAction;

//FOOD
export type FoodActionTypes = FoodStockActions | MealsActions | FetchFoodItemsAction;