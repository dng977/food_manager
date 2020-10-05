package com.dng.foodmanager.receiptservice.services;

import com.dng.foodmanager.receiptservice.domain.FoodItem;
import com.dng.foodmanager.receiptservice.domain.ReceiptItem;
import com.dng.foodmanager.receiptservice.repositories.FoodItemRepository;
import com.dng.foodmanager.receiptservice.repositories.ReceiptItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ReceiptItemServiceImpl implements ReceiptItemService {

    private final ReceiptItemRepository receiptItemRepository;
    private final FoodItemRepository foodItemRepository;


}
