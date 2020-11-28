package com.dng.foodmanager.receiptservice.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class EatFoodDto {
    private final Long foodId;
    private final Integer quantity;
    private final boolean cooked;
}

