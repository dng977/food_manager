package com.dng.foodmanager.receiptservice.services;

import com.dng.foodmanager.receiptservice.domain.FoodItem;
import com.dng.foodmanager.receiptservice.repositories.FoodItemRepository;
import com.dng.foodmanager.receiptservice.util.DtoConverter;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.HashSet;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class FoodItemServiceImplTest {
    FoodItemServiceImpl foodItemService;

    @Mock
    FoodItemRepository foodItemRepository;
    @Mock
    DtoConverter dtoConverter;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        foodItemService = new FoodItemServiceImpl(foodItemRepository,dtoConverter);
    }

    @Test
    void getFoodItems() {
        FoodItem foodItem = new FoodItem();
        HashSet foodItemData = new HashSet();
        foodItemData.add(foodItem);

        when(foodItemService.getFoodItems()).thenReturn(foodItemData
        );

        Set<FoodItem> foodItems = foodItemService.getFoodItems();

        assertEquals(foodItems.size(),1);
        verify(foodItemRepository,times(1)).findAll();
    }
}