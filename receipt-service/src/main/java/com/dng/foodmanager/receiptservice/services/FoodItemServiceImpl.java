package com.dng.foodmanager.receiptservice.services;

import com.dng.foodmanager.receiptservice.domain.FoodItem;
import com.dng.foodmanager.receiptservice.dto.FoodItemDto;
import com.dng.foodmanager.receiptservice.repositories.FoodItemRepository;
import com.dng.foodmanager.receiptservice.util.DtoConverter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class FoodItemServiceImpl implements FoodItemService {
    private final FoodItemRepository foodItemRepository;
    private final DtoConverter dtoConverter;

    @Override
    public Set<FoodItem> getFoodItems() {
        log.debug("I'm in the  service");
        Set<FoodItem> foodItems = new HashSet<>();
        foodItemRepository.findAll().iterator().forEachRemaining(foodItems::add);
        return foodItems;
    }

    @Override
    public List<FoodItemDto> getFoodItemsByName(String name) {
        List<FoodItem> foodItems = foodItemRepository.findByNameLike("%" + name + "%");
        return foodItems.stream().map(dtoConverter::convertToDto).collect(Collectors.toList());
    }
}
