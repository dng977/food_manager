package com.dng.foodmanager.util;

import com.dng.foodmanager.domain.FoodStock;
import com.dng.foodmanager.domain.Receipt;
import com.dng.foodmanager.domain.ReceiptItem;
import com.dng.foodmanager.domain.WholeFood;
import com.dng.foodmanager.dto.food_dtos.FoodStockDto;
import com.dng.foodmanager.dto.food_dtos.WholeFoodDto;
import com.dng.foodmanager.dto.receipt_dtos.ReceiptDto;
import com.dng.foodmanager.dto.receipt_dtos.ReceiptItemDto;
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
                receiptItem.getRecognizedFoods().stream().map(this::convertToDto).collect(Collectors.toList()),
                receiptItem.getStatus());
        System.out.println(receiptItemDto.toString());
        return receiptItemDto;
    }

    public FoodStockDto convertToDto(FoodStock foodStock){
        WholeFood wholeFood = foodStock.getWholeFood();
        WholeFoodDto wholeFoodDto = convertToDto(wholeFood);
        return new FoodStockDto(wholeFoodDto,
                foodStock.getQuantity(),
                wholeFood.getNutritionRaw().isPresent(),
                wholeFood.getNutritionCooked().isPresent()
        );
    }
    public WholeFoodDto convertToDto(WholeFood wholeFood) {
        return new WholeFoodDto(
                wholeFood.getId(),
                wholeFood.getName(),
                wholeFood.getDefaultQuantity(),
                wholeFood.getServingSize(),
                wholeFood.getServingDesc(),
                null,
                wholeFood.getNutritionRaw().isPresent(),
                wholeFood.getNutritionCooked().isPresent()
                );
        //TODO get nutrition as well
    }
//
//    public FoodItemReceiptDto convertToPlainDto(FoodItem foodItem) {
//        return new FoodItemReceiptDto(foodItem.getId(), foodItem.getName());
//    }

}
