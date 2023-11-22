package com.dng.foodmanager.services;

import com.dng.foodmanager.domain.FoodHistory;
import com.dng.foodmanager.domain.FoodStock;
import com.dng.foodmanager.domain.NutritionState;
import com.dng.foodmanager.domain.WholeFood;
import com.dng.foodmanager.domain.id_classes.FoodStockId;
import com.dng.foodmanager.dto.food_dtos.EatFoodDto;
import com.dng.foodmanager.dto.food_dtos.FoodStockDto;
import com.dng.foodmanager.dto.food_dtos.WholeFoodDto;
import com.dng.foodmanager.dto.nutrition_dtos.NutritionStateDto;
import com.dng.foodmanager.repositories.FoodStockRepository;
import com.dng.foodmanager.repositories.NutritionStateRepository;
import com.dng.foodmanager.repositories.UserRepository;
import com.dng.foodmanager.repositories.WholeFoodRepository;
import com.dng.foodmanager.util.DtoConverter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLDataException;
import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class WholeFoodServiceImpl implements WholeFoodService {
    private final WholeFoodRepository wholeFoodRepository;
    private final FoodStockRepository foodStockRepository;
    private final DtoConverter dtoConverter;
    private final NutritionStateRepository nutritionStateRepository;
    private final UserRepository userRepository;
    private final FoodHistoryService foodHistoryService;

    @Override
    public Set<WholeFood> getFoodItems() {
        log.debug("I'm in the  service");
        Set<WholeFood> wholeFoods = new HashSet<>();
        wholeFoodRepository.findAll().iterator().forEachRemaining(wholeFoods::add);
        return wholeFoods;
    }

//    @Override
//    public List<FoodItemReceiptDto> getPlainFoodItemsByName(String name) {
//        List<FoodItem> foodItems = foodItemRepository.findByNameLike("%" + name + "%");
//        return foodItems.stream().map(dtoConverter::convertToPlainDto).collect(Collectors.toList());
//    }

    @Override
    public List<WholeFoodDto> getFoodItemsByName(String name) {
        List<WholeFood> wholeFoods = wholeFoodRepository.findByNameLike("%" + name + "%");
        return wholeFoods.stream().map(dtoConverter::convertToDto).collect(Collectors.toList());
    }


    @Override
    public void editFoodStockItem(String uid, FoodStockDto foodStockDto) throws SQLDataException {
        Optional<FoodStock> foodStockOpt = foodStockRepository.findByUserIdAndFoodItemId(uid, foodStockDto.getWholeFoodDto().getId());
        if (foodStockOpt.isPresent()) {
            FoodStock foodStock = foodStockOpt.get();
            foodStock.setQuantity(foodStockDto.getQuantity());
            foodStockRepository.save(foodStock);
        } else {
            throw new SQLDataException("Food not present");
        }
    }

    @Override
    public List<FoodStockDto> getFoodStock(String uid) {
        return foodStockRepository.findByUserId(uid).stream().map(dtoConverter::convertToDto).collect(Collectors.toList());
    }

    @Transactional
    @Override
    public void deleteFoodStockItems(String uid, List<Long> idsArray) {
        for (Long id : idsArray) {
            foodStockRepository.deleteById(new FoodStockId(uid, id));
        }
    }

    @Override
    public List<FoodStockDto> addItemToFoodStock(String userId, FoodStockDto foodStockDto) {
        Optional<WholeFood> newFoodItemOpt = wholeFoodRepository.findById(foodStockDto.getWholeFoodDto().getId());
        if (newFoodItemOpt.isPresent()) {
            WholeFood newWholeFood = newFoodItemOpt.get();
            Optional<FoodStock> oldFoodStockItemOpt = foodStockRepository.findByUserIdAndFoodItemId(userId, newWholeFood.getId());
            if (oldFoodStockItemOpt.isPresent()) {
                FoodStock oldFoodStockItem = oldFoodStockItemOpt.get();
                oldFoodStockItem.setQuantity(oldFoodStockItem.getQuantity() + foodStockDto.getQuantity());
                foodStockRepository.save(oldFoodStockItem);
            } else {
                FoodStock foodStockItem = new FoodStock(userId, newWholeFood, foodStockDto.getQuantity());
                foodStockRepository.save(foodStockItem);
            }

        } else {
            throw new NoSuchElementException("Food Item with id=" + foodStockDto.getWholeFoodDto().getId() + " is not present.");
        }

        return getFoodStock(userId);
    }

    @Transactional
    @Override
    public NutritionStateDto eat(String userId, EatFoodDto eatFoodDto) throws NoSuchElementException {
        //1) Remove eaten food
        FoodStock foodStockItem = foodStockRepository.findByUserIdAndFoodItemId(userId, eatFoodDto.getFoodId()).get();

        int amountEaten = eatFoodDto.getQuantity();

        if (foodStockItem.getQuantity() != null) {
            float oldQuantity = foodStockItem.getQuantity();
            if (oldQuantity < amountEaten)
                throw new IllegalArgumentException("The food hasn't got sufficient quantity.");

            foodStockItem.setQuantity(oldQuantity - amountEaten);
            foodStockRepository.save(foodStockItem);
        }


        //2) Set nutrition
        if(eatFoodDto.getCooked() == null)
            eatFoodDto.setCooked(false);

        Optional<WholeFood> foodItemOptional = wholeFoodRepository.findById(foodStockItem.getWholeFoodId());


        Optional<NutritionState> nutritionStateOptional = nutritionStateRepository.findByUserIdAndDate(userId, Instant.now()); //todays date - must be fixed to get users locale
        //If there is already such state
        boolean update;
        NutritionState nutritionState;
        if (nutritionStateOptional.isPresent()) {
            update = true;
            nutritionState = nutritionStateOptional.get();
        } else {
            nutritionState = new NutritionState(userId, Instant.now());
        }

        foodItemOptional.ifPresent(wholeFood -> this.updateNutritionStateForWholeFood(nutritionState, wholeFood, eatFoodDto.getQuantity(), eatFoodDto.getCooked()));

        nutritionStateRepository.save(nutritionState);


        //3)Add food to history
        FoodHistory wholeFoodHistory = new FoodHistory();
        wholeFoodHistory.setUser(userRepository.findById(userId).orElseThrow());
        wholeFoodHistory.setDate(Instant.now());
        wholeFoodHistory.setWholeFood(wholeFoodRepository.findById(eatFoodDto.getFoodId()).orElseThrow());
        wholeFoodHistory.setQuantity(amountEaten);
        wholeFoodHistory.setCooked(eatFoodDto.getCooked());


        foodHistoryService.addFoodHistory(wholeFoodHistory);

        return nutritionState.convertToDto();

    }


}
