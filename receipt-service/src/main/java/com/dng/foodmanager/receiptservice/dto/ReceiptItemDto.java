package com.dng.foodmanager.receiptservice.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.List;

@RequiredArgsConstructor
@Getter
@Setter
public class ReceiptItemDto {
    private final long id;
    private final String referenceName;
    private final List<FoodItemDto> foodItemDto;
    private final String status;
}

