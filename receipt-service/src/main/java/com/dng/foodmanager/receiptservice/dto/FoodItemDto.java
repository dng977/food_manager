package com.dng.foodmanager.receiptservice.dto;

import com.dng.foodmanager.receiptservice.domain.FoodNutrition;
import com.dng.foodmanager.receiptservice.domain.ServingUnit;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class FoodItemDto {
    private final Long id;
    private final String name;
    private final int defaultQuantity;
    private final int servingSize;
    private final String servingDesc;
    private final ServingUnit servingUnit;
    private final FoodNutrition nutrition;

}
