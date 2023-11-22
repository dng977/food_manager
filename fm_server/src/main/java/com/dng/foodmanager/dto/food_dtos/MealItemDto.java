package com.dng.foodmanager.dto.food_dtos;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class MealItemDto {
    private final WholeFoodDto wholeFoodDto;

    private final Integer quantity;
    private final boolean cooked;
}
