package com.dng.foodmanager.receiptservice.services;

import com.dng.foodmanager.receiptservice.domain.FoodItem;
import com.dng.foodmanager.receiptservice.domain.NutritionState;
import com.dng.foodmanager.receiptservice.dto.*;

import java.sql.SQLDataException;
import java.util.List;
import java.util.Set;

public interface FoodService {
    Set<FoodItem> getFoodItems();
    List<PlainFoodItemDto> getPlainFoodItemsByName(String name);
    List<FoodItemDto> getFoodItemsByName(String name);


    void editFoodStockItem(String uid, FoodStockDto foodStockDto) throws SQLDataException;

    List<FoodStockDto> getFoodStock(String uid);

    void deleteFoodStockItems(String uid, List<Long> fItemIds);

    List<FoodStockDto> addItemToFoodStock(String userId, PlainFoodStockDto plainFoodStockDto);

    NutritionStateDto eat(String userId, EatFoodStockDto eatFoodStockDto);

}
