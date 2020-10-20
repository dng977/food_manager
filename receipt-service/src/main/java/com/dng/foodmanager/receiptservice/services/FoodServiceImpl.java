package com.dng.foodmanager.receiptservice.services;

import com.dng.foodmanager.receiptservice.domain.FoodItem;
import com.dng.foodmanager.receiptservice.domain.FoodStock;
import com.dng.foodmanager.receiptservice.dto.AddFoodStockDto;
import com.dng.foodmanager.receiptservice.dto.FoodItemDto;
import com.dng.foodmanager.receiptservice.dto.PlainFoodItemDto;
import com.dng.foodmanager.receiptservice.dto.FoodStockDto;
import com.dng.foodmanager.receiptservice.repositories.FoodItemRepository;
import com.dng.foodmanager.receiptservice.repositories.FoodStockRepository;
import com.dng.foodmanager.receiptservice.util.DtoConverter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.SQLDataException;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class FoodServiceImpl implements FoodService {
    private final FoodItemRepository foodItemRepository;
    private final FoodStockRepository foodStockRepository;
    private final DtoConverter dtoConverter;


    @Override
    public Set<FoodItem> getFoodItems() {
        log.debug("I'm in the  service");
        Set<FoodItem> foodItems = new HashSet<>();
        foodItemRepository.findAll().iterator().forEachRemaining(foodItems::add);
        return foodItems;
    }

    @Override
    public List<PlainFoodItemDto> getPlainFoodItemsByName(String name) {
        List<FoodItem> foodItems = foodItemRepository.findByNameLike("%" + name + "%");
        return foodItems.stream().map(dtoConverter::convertToPlainDto).collect(Collectors.toList());
    }

    @Override
    public List<FoodItemDto> getFoodItemsByName(String name) {
        List<FoodItem> foodItems = foodItemRepository.findByNameLike("%" + name + "%");
        return foodItems.stream().map(dtoConverter::convertToDto).collect(Collectors.toList());
    }


    @Override
    public void editFoodStockItem(String uid, FoodStockDto foodStockDto) throws SQLDataException {
        Optional<FoodStock> foodStockOpt = foodStockRepository.findById(foodStockDto.getId());
        if(foodStockOpt.isPresent()){
            FoodStock foodStock = foodStockOpt.get();
            foodStock.setQuantity(foodStockDto.getQuantity());
            foodStockRepository.save(foodStock);
        }else{
            throw new SQLDataException("Food not present");
        }
    }

    @Override
    public List<FoodStockDto> getFoodStock(String uid) {
        List<FoodStockDto> foodStockDtoList = new ArrayList<>();
        foodStockRepository.findByUserId(uid).iterator().forEachRemaining(
                foodStockItem -> foodStockDtoList.add(dtoConverter.convertToDto(foodStockItem))
        );

        return foodStockDtoList;
    }

    @Transactional
    @Override
    public void deleteFoodStockItems(String uid, List<Long> idsArray) {
        for (Long id : idsArray){
            foodStockRepository.deleteById(id);
        }
        foodStockRepository.resetIdSeed();
    }

    @Override
    public List<FoodStockDto> addItemToFoodStock(String userId, AddFoodStockDto addFoodStockDto) {
        Optional<FoodItem> newFoodItemOpt = foodItemRepository.findById(addFoodStockDto.getFoodItemId());
        if(newFoodItemOpt.isPresent()){
            FoodItem newFoodItem = newFoodItemOpt.get();
            Optional<FoodStock> oldFoodStockItemOpt = foodStockRepository.findByUserIdAndFoodItemId(userId, newFoodItem.getId());
            if(oldFoodStockItemOpt.isPresent()){
                FoodStock oldFoodStockItem = oldFoodStockItemOpt.get();
                oldFoodStockItem.setQuantity(oldFoodStockItem.getQuantity() + addFoodStockDto.getQuantity());
                foodStockRepository.save(oldFoodStockItem);
            }else{
                FoodStock foodStockItem = new FoodStock(userId,newFoodItem,addFoodStockDto.getQuantity());
                foodStockRepository.save(foodStockItem);
            }

        }
        else{
            throw new NoSuchElementException("Food Item with id=" + addFoodStockDto.getFoodItemId() + " is not present.");
        }

        return getFoodStock(userId);
    }
}
