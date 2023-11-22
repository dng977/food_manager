package com.dng.foodmanager.dto.receipt_dtos;

import com.dng.foodmanager.domain.ReceiptItemStatus;
import com.dng.foodmanager.dto.food_dtos.WholeFoodDto;
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
    private final List<WholeFoodDto> wholeFoodDtoList;
    private final ReceiptItemStatus status;
}

