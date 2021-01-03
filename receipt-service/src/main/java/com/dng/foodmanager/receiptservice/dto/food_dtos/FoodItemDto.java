package com.dng.foodmanager.receiptservice.dto.food_dtos;

import com.dng.foodmanager.receiptservice.domain.FoodNutrition;
import com.dng.foodmanager.receiptservice.domain.ServingUnit;
import com.fasterxml.jackson.annotation.JsonProperty;
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
    @Nullable
    private String name;

    @Nullable
    private Integer defaultQuantity;

    @Nullable
    private Integer servingSize;

    @Nullable
    private String servingDesc;
//    private ServingUnit servingUnit;
    @Nullable
    private FoodNutrition nutrition;
    @Nullable
    private Boolean hasRaw;
    @Nullable
    private Boolean hasCooked;

}
