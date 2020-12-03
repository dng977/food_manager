package com.dng.foodmanager.receiptservice.dto.food_dtos;

import com.dng.foodmanager.receiptservice.domain.ServingUnit;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FoodStockDto {
    private FoodItemDto foodItemDto;
    private Integer quantity;
    private Boolean hasRaw;
    private Boolean hasCooked;
}
