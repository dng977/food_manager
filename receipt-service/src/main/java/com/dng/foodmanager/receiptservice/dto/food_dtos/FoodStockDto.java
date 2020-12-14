package com.dng.foodmanager.receiptservice.dto.food_dtos;

import com.dng.foodmanager.receiptservice.domain.ServingUnit;
import lombok.*;
import org.springframework.lang.Nullable;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FoodStockDto {
    private FoodItemDto foodItemDto;
    private Integer quantity;
    @Nullable
    private Boolean hasRaw;
    @Nullable
    private Boolean hasCooked;

}
