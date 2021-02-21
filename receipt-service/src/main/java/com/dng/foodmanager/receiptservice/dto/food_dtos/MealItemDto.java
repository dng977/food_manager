package com.dng.foodmanager.receiptservice.dto.food_dtos;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class MealItemDto {
    private final FoodItemDto foodItemDto;

    private final Integer quantity;
    private final boolean cooked;
}
