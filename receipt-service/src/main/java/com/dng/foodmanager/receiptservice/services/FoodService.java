package com.dng.foodmanager.receiptservice.services;

import com.dng.foodmanager.receiptservice.domain.FoodItem;
import com.dng.foodmanager.receiptservice.dto.AddFoodStockDto;
import com.dng.foodmanager.receiptservice.dto.FoodItemDto;
import com.dng.foodmanager.receiptservice.dto.PlainFoodItemDto;
import com.dng.foodmanager.receiptservice.dto.FoodStockDto;

import java.sql.SQLDataException;
import java.util.List;
import java.util.Set;

public interface FoodService {
    Set<FoodItem> getFoodItems();
    List<PlainFoodItemDto> getPlainFoodItemsByName(String name);
    List<FoodItemDto> getFoodItemsByName(String name);


    void editFoodStockItem(String uid, FoodStockDto foodStockDto) throws SQLDataException;

    List<FoodStockDto> getFoodStock(String uid);

    void deleteFoodStockItems(String uid, List<Long> idsArray);

    List<FoodStockDto> addItemToFoodStock(String userId, AddFoodStockDto addFoodStockDto);

    void eat(String userId, Long foodItemId);

}
