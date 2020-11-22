package com.dng.foodmanager.receiptservice.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@ToString
@RequiredArgsConstructor
@Getter
@Setter
public class ReceiptItemDto {
    private final long id;
    private final String referenceName;
    private final List<FoodItemReceiptDto> foodItemReceiptDto;
    private final String status;
}

