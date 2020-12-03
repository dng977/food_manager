package com.dng.foodmanager.receiptservice.dto.deprecated;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@RequiredArgsConstructor
public class FoodStockAddDto {
        private final Long foodItemId;
        private final Integer quantity;
}
