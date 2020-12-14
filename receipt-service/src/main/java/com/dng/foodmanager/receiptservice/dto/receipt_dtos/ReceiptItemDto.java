package com.dng.foodmanager.receiptservice.dto.receipt_dtos;

import com.dng.foodmanager.receiptservice.domain.ReceiptItemStatus;
import com.dng.foodmanager.receiptservice.dto.food_dtos.FoodItemDto;
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
    private final List<FoodItemDto> foodItemReceiptDto;
    private final ReceiptItemStatus status;
}

