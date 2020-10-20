package com.dng.foodmanager.receiptservice.services;

import com.dng.foodmanager.receiptservice.domain.FoodItem;
import com.dng.foodmanager.receiptservice.dto.FoodItemDto;

import java.util.List;
import java.util.Set;

public interface FoodItemService {
    Set<FoodItem> getFoodItems();
    List<FoodItemDto> getFoodItemsByName(String name);

    List<FoodItemDto> addReceiptToFoodStock(String userId, Long receiptId);
}
