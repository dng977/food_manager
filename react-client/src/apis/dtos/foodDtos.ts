export interface FoodItemDto {
		id: number;
		name?: string;
		defaultQuantity?: number;
		servingSize?: number;
		servingDesc?: number;
		servingUnit?: number;
		nutrition?: object;
}

export interface EatFoodDto {
		foodId: number;
		quantity: number;
		cooked: boolean;
}

export interface FoodStockDto {
		foodItemDto: FoodItemDto;
		quantity: number;
		hasRaw?: boolean;
		hasCooked?: boolean;
}

export interface MealDto {
	id: number;
	name: string;
	description: string;
	ingredients: MealItemDto[];
}

export interface MealItemDto {
	foodItemId: number;
	quantity: number;
	cooked: boolean;
}