import { createSelector, Selector } from 'reselect'
import { FoodStockDto, MealDto } from '../../../apis/dtos/serverDtos';
import { RootState } from '../../../redux_store/rootReducer';

const selectReceiptsData = (state: RootState) => state.receipts.receipts;
const selectReceiptItemsData = (state: RootState) => state.receipts.currentReceipt.receiptItems;
const selectFoodStockData = (state: RootState) => state.food.foodStock;
const selectActivityFactorsData = (state: RootState) => state.nutrition.activityFactors;
const selectMealsData = (state: RootState) => state.food.meals;

export const getReceipts = createSelector(
  selectReceiptsData,(data) => {
    let indexToKey = [];
    const receiptData = Object.values(data).map((values, index) => {
      indexToKey[index] = values.id;
      return [ values.storeName, values.date, false ];
    })
    return [receiptData, indexToKey];
  }
)

export const getReceiptItems = createSelector(selectReceiptItemsData,(itemsData) => {
  const receiptData = Object.values(itemsData).map((values) => {
    let foodItem = values.foodItemReceiptDto;
    return [ values.referenceName, {id: values.id, foodList: foodItem==null ? '?' : foodItem } , values.status];
  })
  return receiptData;

  }
)

export type FoodStockListType = Array<[string, FoodStockDto, FoodStockDto]>
export const getFoodStock: Selector<RootState,[FoodStockListType, Array<number>]> = createSelector(
  selectFoodStockData,(data) => {
    const indexToKey: number[] = [];
    console.log(data);
    const foodStockData: FoodStockListType = Object.values(data).map((values, index): [string, FoodStockDto, FoodStockDto] => {
      indexToKey[index] = values.foodItemDto.id
      return [ values.foodItemDto.name, {...values}, {...values} ];
    });
    return [foodStockData, indexToKey];

  }
)

export type MealsListType = Array<[string, MealDto, MealDto, MealDto]>
export const getMeals: Selector<RootState, [MealsListType, Array<number>]> = createSelector(
  selectMealsData,(data) => {
    const indexToKey = [];
    const mealsData: MealsListType = Object.values(data).map((values, index): [string, MealDto, MealDto, MealDto] => {
      indexToKey[index] = values.id;
      return [ values.name, {...values}, {...values}, {...values}];
    })
    return [mealsData, indexToKey];
  }
)

export const getActivityFactors = createSelector(
  selectActivityFactorsData,(data) => {
    return data.map(item => {
      return item.activityFactor + ": " + item.description;
    })
  }
)

