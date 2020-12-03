package com.dng.foodmanager.receiptservice.dto.food_dtos;

import com.dng.foodmanager.receiptservice.domain.FoodNutrition;
import com.dng.foodmanager.receiptservice.domain.ServingUnit;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.lang.Nullable;

@Getter
@Setter
@AllArgsConstructor
public class FoodItemDto {
    private Long id;
    private String name;
    private Integer defaultQuantity;
    private Integer servingSize;
    private String servingDesc;
    private ServingUnit servingUnit;
    @Nullable
    private FoodNutrition nutrition;

}
