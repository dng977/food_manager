package com.dng.foodmanager.receiptservice.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class FoodStockDto {
    private final Long foodItemId;
    private final String foodName;
    private final Integer quantity;
    private final int servingSize;
    private final boolean countable;
    private final boolean hasRaw;
    private final boolean hasCooked;
}
