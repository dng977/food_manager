package com.dng.foodmanager.services;

import com.dng.foodmanager.domain.WholeFood;
import com.dng.foodmanager.receiptservice.repositories.*;
import com.dng.foodmanager.util.DtoConverter;
import com.dng.foodmanager.repositories.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.HashSet;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class WholeFoodServiceImplTest {
    WholeFoodServiceImpl foodItemService;

    @Mock
    WholeFoodRepository wholeFoodRepository;
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
    @Mock
    FileStorageService fileStorageService;

    @Mock
    FoodHistoryService foodHistoryService;
    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        foodItemService = new WholeFoodServiceImpl(wholeFoodRepository,foodStockRepository,dtoConverter, nutritionStateRepository, userRepository,foodHistoryService);
    }

    @Test
    void getFoodItems() {
        WholeFood wholeFood = new WholeFood();
        HashSet foodItemData = new HashSet();
        foodItemData.add(wholeFood);

        when(foodItemService.getFoodItems()).thenReturn(foodItemData
        );

        Set<WholeFood> wholeFoods = foodItemService.getFoodItems();

        assertEquals(wholeFoods.size(),1);
        verify(wholeFoodRepository,times(1)).findAll();
    }
}