package com.dng.foodmanager.dto.food_dtos;

import com.dng.foodmanager.domain.FoodNutrition;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.lang.Nullable;

@Getter
@Setter
@AllArgsConstructor
public class WholeFoodDto {
    private Long id;
    @Nullable
    private String name;

    @Nullable
    private Float defaultQuantity;

    @Nullable
    private Float servingSize;

    @Nullable
    private String servingDesc;
    @Nullable
    private FoodNutrition nutrition;
    @Nullable
    private Boolean hasRaw;
    @Nullable
    private Boolean hasCooked;

}
