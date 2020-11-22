package com.dng.foodmanager.receiptservice.dto;

import com.dng.foodmanager.receiptservice.domain.ServingUnit;
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
    private final String servingDesc;
    private final ServingUnit servingUnit;
    private final boolean hasRaw;
    private final boolean hasCooked;
}
