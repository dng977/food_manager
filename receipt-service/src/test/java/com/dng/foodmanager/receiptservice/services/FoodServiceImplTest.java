package com.dng.foodmanager.receiptservice.services;

import com.dng.foodmanager.receiptservice.domain.FoodItem;
import com.dng.foodmanager.receiptservice.domain.NutritionState;
import com.dng.foodmanager.receiptservice.repositories.*;
import com.dng.foodmanager.receiptservice.util.DtoConverter;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.HashSet;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class FoodServiceImplTest {
    FoodServiceImpl foodItemService;

    @Mock
    FoodItemRepository foodItemRepository;
    @Mock
    ReceiptItemRepository receiptItemRepository;
    @Mock
    FoodStockRepository foodStockRepository;
    @Mock
    NutritionStateRepository nutritionStateRepository;
    @Mock
    UserRepository userRepository;

    @Mock
    DtoConverter dtoConverter;
    @Mock
    MealRepository mealRepository;
    @Mock
    MealItemRepository mealItemRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        foodItemService = new FoodServiceImpl(foodItemRepository,foodStockRepository,dtoConverter, nutritionStateRepository, userRepository, mealRepository, mealItemRepository);
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