package com.dng.foodmanager.receiptservice.dto.deprecated;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
public class FoodItemReceiptDto {
    private final Long id;
    private final String name;

}
