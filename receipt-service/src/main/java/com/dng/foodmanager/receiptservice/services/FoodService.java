package com.dng.foodmanager.receiptservice.services;

import com.dng.foodmanager.receiptservice.domain.FoodItem;
import com.dng.foodmanager.receiptservice.dto.*;
import com.dng.foodmanager.receiptservice.dto.food_dtos.*;

import java.sql.SQLDataException;
import java.util.List;
import java.util.Set;

public interface FoodService {
    Set<FoodItem> getFoodItems();
//    List<FoodItemReceiptDto> getPlainFoodItemsByName(String name);
    List<FoodItemDto> getFoodItemsByName(String name);


    void editFoodStockItem(String uid, FoodStockDto foodStockDto) throws SQLDataException;

    List<FoodStockDto> getFoodStock(String uid);

    void deleteFoodStockItems(String uid, List<Long> fItemIds);

    List<FoodStockDto> addItemToFoodStock(String userId, FoodStockDto foodStockDto);

    NutritionStateDto eat(String userId, EatFoodDto eatFoodDto);

    void editMeal(String userId, MealDto mealDto);

    List<MealDto> addMeal(String userId, MealDto mealDto);

    void deleteMeal(String uid, List<Long> idsArray);

    List<MealDto> fetchMeals(String uid);

    NutritionStateDto eatMeal(String userId, EatFoodDto eatFoodDto);
}
