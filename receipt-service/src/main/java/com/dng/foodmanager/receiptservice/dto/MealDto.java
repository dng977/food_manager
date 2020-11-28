package com.dng.foodmanager.receiptservice.dto;

import com.dng.foodmanager.receiptservice.domain.Meal;
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
    private final List<MealItemDto> ingredients;

}
