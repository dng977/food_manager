package com.dng.foodmanager.dto.food_dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.lang.Nullable;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FoodStockDto {
    private WholeFoodDto wholeFoodDto;
    private Float quantity;
    @Nullable
    private Boolean hasRaw;
    @Nullable
    private Boolean hasCooked;

}
