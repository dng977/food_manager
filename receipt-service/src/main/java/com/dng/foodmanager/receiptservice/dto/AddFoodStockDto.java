package com.dng.foodmanager.receiptservice.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@RequiredArgsConstructor
public class AddFoodStockDto {
        private final Long foodItemId;
        private final Integer quantity;
}
