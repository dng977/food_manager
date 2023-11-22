package com.dng.foodmanager.services;

import com.dng.foodmanager.domain.WholeFood;
import com.dng.foodmanager.dto.food_dtos.FoodStockDto;
import com.dng.foodmanager.dto.food_dtos.WholeFoodDto;

import java.sql.SQLDataException;
import java.util.List;
import java.util.Set;

public interface WholeFoodService extends FoodService {
    Set<WholeFood> getFoodItems();

    //    List<FoodItemReceiptDto> getPlainFoodItemsByName(String name);
    List<WholeFoodDto> getFoodItemsByName(String name);

    void editFoodStockItem(String uid, FoodStockDto foodStockDto) throws SQLDataException;

    List<FoodStockDto> getFoodStock(String uid);

    void deleteFoodStockItems(String uid, List<Long> fItemIds);

    List<FoodStockDto> addItemToFoodStock(String userId, FoodStockDto foodStockDto);

}


