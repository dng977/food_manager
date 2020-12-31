package com.dng.foodmanager.receiptservice.dto.food_dtos;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
@RequiredArgsConstructor
public class MealDto {
    private final Long id;
    private final String name;
    private final String description;
    private final int quantity;
    private final int servings;
    private final List<MealItemDto> ingredients;

}
