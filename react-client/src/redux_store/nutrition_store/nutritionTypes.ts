import { ActivityDto, ActivityFactor, WholeFoodDto, NutritionRdaDto, NutritionStateDto } from "../../apis/dtos/serverDtos";

export const FETCH_NUTRITION_STATE = 'FETCH_NUTRITION_STATE';
export const FETCH_NUTRITION_RDA = 'FETCH_NUTRITION_RDA';
export const FETCH_ACTIVITY_FACTORS = 'FETCH_ACTIVITY_FACTORS';
export const UPDATE_USER_STATE = 'UPDATE_USER_STATE';

export interface NutritionStoreState {
  userDetails: boolean,
  nutritionRDA?: NutritionRdaDto,
  nutritionState: NutritionStateDto | {},
  activityFactors: ActivityDto[];

}

export interface FetchActivityFactorsAction {
  type: typeof FETCH_ACTIVITY_FACTORS;
  payload: ActivityDto[];
}

export interface FetchNutritionStateAction {
  type: typeof FETCH_NUTRITION_STATE;
  payload: NutritionStateDto;
}

export interface FetchNutritionRdaAction {
  type: typeof FETCH_NUTRITION_RDA;
  payload: NutritionRdaDto;
}
export interface UpdateUserStateAction {
  type: typeof UPDATE_USER_STATE;
}

export type NutritionActions = FetchActivityFactorsAction | FetchNutritionRdaAction | FetchNutritionStateAction | UpdateUserStateAction;
