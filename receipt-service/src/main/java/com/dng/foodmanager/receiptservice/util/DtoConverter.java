package com.dng.foodmanager.receiptservice.util;

import com.dng.foodmanager.receiptservice.domain.FoodItem;
import com.dng.foodmanager.receiptservice.domain.Receipt;
import com.dng.foodmanager.receiptservice.domain.ReceiptItem;
import com.dng.foodmanager.receiptservice.dto.FoodItemDto;
import com.dng.foodmanager.receiptservice.dto.ReceiptDto;
import com.dng.foodmanager.receiptservice.dto.ReceiptItemDto;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.stream.Collectors;

@Component
public class DtoConverter {

    public ReceiptDto convertToDto(Receipt receipt, boolean includeItems) {
        System.out.println(receipt.toString());;
        ReceiptDto receiptDto = new ReceiptDto(receipt.getId(), receipt.getStoreName(), receipt.getDate().toString(), receipt.getConfirmed(), includeItems ?
                receipt.getReceiptItems().stream().map((this::convertToDto)).collect(Collectors.toList()) :
                Collections.emptyList());
        return receiptDto;
    }

    public ReceiptItemDto convertToDto(ReceiptItem receiptItem) {
        ReceiptItemDto receiptItemDto = new ReceiptItemDto(
                receiptItem.getId(),
                receiptItem.getReferenceName(),
                receiptItem.getRecognizedFoods().stream().map(this::convertToDto).collect(Collectors.toList()),
                receiptItem.getStatus().toString());
        System.out.println(receiptItemDto.toString());
        return receiptItemDto;
    }


    public FoodItemDto convertToDto(FoodItem foodItem) {
        return new FoodItemDto(foodItem.getId(), foodItem.getName());
    }
}
