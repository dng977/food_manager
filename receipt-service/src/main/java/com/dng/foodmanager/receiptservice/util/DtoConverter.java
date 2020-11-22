package com.dng.foodmanager.receiptservice.util;

import com.dng.foodmanager.receiptservice.domain.*;
import com.dng.foodmanager.receiptservice.dto.*;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.stream.Collectors;

@Component
public class DtoConverter {

    public ReceiptDto convertToDto(Receipt receipt, boolean includeItems) {
        ReceiptDto receiptDto = new ReceiptDto(receipt.getId(), receipt.getStoreName(), receipt.getDate().toString(), receipt.getConfirmed(), includeItems ?
                receipt.getReceiptItems().stream().map((this::convertToDto)).collect(Collectors.toList()) :
                Collections.emptyList());
        return receiptDto;
    }

    public ReceiptItemDto convertToDto(ReceiptItem receiptItem) {
        ReceiptItemDto receiptItemDto = new ReceiptItemDto(
                receiptItem.getId(),
                receiptItem.getReferenceName(),
                receiptItem.getRecognizedFoods().stream().map(this::convertToPlainDto).collect(Collectors.toList()),
                receiptItem.getStatus().toString());
        System.out.println(receiptItemDto.toString());
        return receiptItemDto;
    }

    public FoodStockDto convertToDto(FoodStock foodStock){
        FoodItem foodItem = foodStock.getFoodItem();
        return new FoodStockDto(
                foodStock.getFoodItemId(),
                foodItem.getName(),
                foodStock.getQuantity(),
                foodItem.getServingSize(),
                foodItem.getServingDesc(),
                foodItem.getServingUnit().isPresent() ? foodItem.getServingUnit().get() : ServingUnit.PIECE,
                foodItem.getNutritionRaw().isPresent(),
                foodItem.getNutritionCooked().isPresent()
        );
    }
    public FoodItemDto convertToDto(FoodItem foodItem) {
        return new FoodItemDto(
                foodItem.getId(),
                foodItem.getName(),
                foodItem.getDefaultQuantity(),
                foodItem.getServingSize(),
                foodItem.getServingDesc(),
                foodItem.getServingUnit().isPresent() ? foodItem.getServingUnit().get() : ServingUnit.PIECE,
                null);
        //TODO get nutrition as well
    }

    public FoodItemReceiptDto convertToPlainDto(FoodItem foodItem) {
        return new FoodItemReceiptDto(foodItem.getId(), foodItem.getName());
    }

}
