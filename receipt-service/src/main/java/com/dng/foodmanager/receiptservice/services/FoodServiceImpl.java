package com.dng.foodmanager.receiptservice.services;

import com.dng.foodmanager.receiptservice.domain.*;
import com.dng.foodmanager.receiptservice.domain.id_classes.FoodStockId;
import com.dng.foodmanager.receiptservice.dto.*;
import com.dng.foodmanager.receiptservice.dto.food_dtos.*;
import com.dng.foodmanager.receiptservice.repositories.*;
import com.dng.foodmanager.receiptservice.util.DtoConverter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.SQLDataException;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class FoodServiceImpl implements FoodService {
    private final FoodItemRepository foodItemRepository;
    private final FoodStockRepository foodStockRepository;
    private final DtoConverter dtoConverter;
    private final NutritionStateRepository nutritionStateRepository;
    private final UserRepository userRepository;
    private final MealRepository mealRepository;


    @Override
    public Set<FoodItem> getFoodItems() {
        log.debug("I'm in the  service");
        Set<FoodItem> foodItems = new HashSet<>();
        foodItemRepository.findAll().iterator().forEachRemaining(foodItems::add);
        return foodItems;
    }

//    @Override
//    public List<FoodItemReceiptDto> getPlainFoodItemsByName(String name) {
//        List<FoodItem> foodItems = foodItemRepository.findByNameLike("%" + name + "%");
//        return foodItems.stream().map(dtoConverter::convertToPlainDto).collect(Collectors.toList());
//    }

    @Override
    public List<FoodItemDto> getFoodItemsByName(String name) {
        List<FoodItem> foodItems = foodItemRepository.findByNameLike("%" + name + "%");
        return foodItems.stream().map(dtoConverter::convertToDto).collect(Collectors.toList());
    }


    @Override
    public void editFoodStockItem(String uid, FoodStockDto foodStockDto) throws SQLDataException {
        Optional<FoodStock> foodStockOpt = foodStockRepository.findByUserIdAndFoodItemId(uid, foodStockDto.getFoodItemDto().getId());
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
        Optional<FoodItem> newFoodItemOpt = foodItemRepository.findById(foodStockDto.getFoodItemDto().getId());
        if (newFoodItemOpt.isPresent()) {
            FoodItem newFoodItem = newFoodItemOpt.get();
            Optional<FoodStock> oldFoodStockItemOpt = foodStockRepository.findByUserIdAndFoodItemId(userId, newFoodItem.getId());
            if (oldFoodStockItemOpt.isPresent()) {
                FoodStock oldFoodStockItem = oldFoodStockItemOpt.get();
                oldFoodStockItem.setQuantity(oldFoodStockItem.getQuantity() + foodStockDto.getQuantity());
                foodStockRepository.save(oldFoodStockItem);
            } else {
                FoodStock foodStockItem = new FoodStock(userId, newFoodItem, foodStockDto.getQuantity());
                foodStockRepository.save(foodStockItem);
            }

        } else {
            throw new NoSuchElementException("Food Item with id=" + foodStockDto.getFoodItemDto().getId() + " is not present.");
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
            int oldQuantity = foodStockItem.getQuantity();
            if (oldQuantity < amountEaten)
                throw new IllegalArgumentException("The food hasn't got sufficient quantity.");

            foodStockItem.setQuantity(oldQuantity - amountEaten);
            foodStockRepository.save(foodStockItem);
        }


        //2) Set nutrition
        Optional<FoodItem> foodItemOptional = foodItemRepository.findById(eatFoodDto.getFoodId());

        Optional<FoodNutrition> foodNutritionOptional = eatFoodDto.getCooked() ? foodItemOptional.get().getNutritionCooked() : foodItemOptional.get().getNutritionRaw();
        if (!foodNutritionOptional.isPresent())
            throw new IllegalArgumentException("Nutrition info for either raw or cooked isn't present.");

        FoodNutrition foodNutrition = foodNutritionOptional.get();
        NutritionState nutritionState;
        boolean update = false;

        Optional<NutritionState> nutritionStateOptional = nutritionStateRepository.findByUserIdAndDate(userId, LocalDate.now()); //todays date - must be fixed to get users locale
        //If there is already such state
        if (nutritionStateOptional.isPresent()) {
            update = true;
            nutritionState = nutritionStateOptional.get();
        } else {
            nutritionState = new NutritionState(userId, LocalDate.now());
        }

        nutritionState.setNutrients(
                amountEaten,
                update,
                foodNutrition.getEnergy_kcal().isPresent() ? foodNutrition.getEnergy_kcal().get() : 0,
                foodNutrition.getWater_g().isPresent() ? foodNutrition.getWater_g().get() : 0,
                foodNutrition.getCarbohydrates_g().isPresent() ? foodNutrition.getCarbohydrates_g().get() : 0,
                foodNutrition.getFiber_g().isPresent() ? foodNutrition.getFiber_g().get() : 0,
                foodNutrition.getFat_g().isPresent() ? foodNutrition.getFat_g().get() : 0,
                foodNutrition.getSatFat_g().isPresent() ? foodNutrition.getSatFat_g().get() : 0,
                foodNutrition.getMonoFat_g().isPresent() ? foodNutrition.getMonoFat_g().get() : 0,
                foodNutrition.getPolyFat_g().isPresent() ? foodNutrition.getPolyFat_g().get() : 0,
                foodNutrition.getOmega6_g().isPresent() ? foodNutrition.getOmega6_g().get() : 0,
                foodNutrition.getOmega3_g().isPresent() ? foodNutrition.getOmega3_g().get() : 0,
                foodNutrition.getProtein_g().isPresent() ? foodNutrition.getProtein_g().get() : 0,
                foodNutrition.getCholesterol_mg().isPresent() ? foodNutrition.getCholesterol_mg().get() : 0,
                foodNutrition.getSugar_g().isPresent() ? foodNutrition.getSugar_g().get() : 0,
                foodNutrition.getSucrose_g().isPresent() ? foodNutrition.getSucrose_g().get() : 0,
                foodNutrition.getVitaminA_mcg().isPresent() ? foodNutrition.getVitaminA_mcg().get() : 0,
                foodNutrition.getVitaminC_mg().isPresent() ? foodNutrition.getVitaminC_mg().get() : 0,
                foodNutrition.getVitaminD_mcg().isPresent() ? foodNutrition.getVitaminD_mcg().get() : 0,
                foodNutrition.getVitaminE_mg().isPresent() ? foodNutrition.getVitaminE_mg().get() : 0,
                foodNutrition.getVitaminK_mcg().isPresent() ? foodNutrition.getVitaminK_mcg().get() : 0,
                foodNutrition.getThiaminB1_mg().isPresent() ? foodNutrition.getThiaminB1_mg().get() : 0,
                foodNutrition.getRiboflavinB2_mg().isPresent() ? foodNutrition.getRiboflavinB2_mg().get() : 0,
                foodNutrition.getNiacinB3_mg().isPresent() ? foodNutrition.getNiacinB3_mg().get() : 0,
                foodNutrition.getVitaminB6_mg().isPresent() ? foodNutrition.getVitaminB6_mg().get() : 0,
                foodNutrition.getFolateB9_mcg().isPresent() ? foodNutrition.getFolateB9_mcg().get() : 0,
                foodNutrition.getVitaminB12_mcg().isPresent() ? foodNutrition.getVitaminB12_mcg().get() : 0,
                foodNutrition.getPantothenicAcidB5_mg().isPresent() ? foodNutrition.getPantothenicAcidB5_mg().get() : 0,
                0,
                foodNutrition.getCholine_mg().isPresent() ? foodNutrition.getCholine_mg().get() : 0,
                foodNutrition.getCalcium_mg().isPresent() ? foodNutrition.getCalcium_mg().get() : 0,
                0,
                foodNutrition.getCopper_mg().isPresent() ? foodNutrition.getCopper_mg().get() : 0,
                0,
                0,
                foodNutrition.getIron_mg().isPresent() ? foodNutrition.getIron_mg().get() : 0,
                foodNutrition.getMagnesium_mg().isPresent() ? foodNutrition.getMagnesium_mg().get() : 0,
                foodNutrition.getManganese_mg().isPresent() ? foodNutrition.getManganese_mg().get() : 0,
                0,
                foodNutrition.getPhosphorus_mg().isPresent() ? foodNutrition.getPhosphorus_mg().get() : 0,
                foodNutrition.getSelenium_mcg().isPresent() ? foodNutrition.getSelenium_mcg().get() : 0,
                foodNutrition.getZinc_mg().isPresent() ? foodNutrition.getZinc_mg().get() : 0,
                foodNutrition.getPotassium_mg().isPresent() ? foodNutrition.getPotassium_mg().get() : 0,
                foodNutrition.getSodium_mg().isPresent() ? foodNutrition.getSodium_mg().get() : 0,
                0,
                foodNutrition.getLycopene_mcg().isPresent() ? foodNutrition.getLycopene_mcg().get() : 0,
                foodNutrition.getLutZea_mcg().isPresent() ? foodNutrition.getLutZea_mcg().get() : 0
        );
        nutritionStateRepository.save(nutritionState);


        return nutritionState.convertToDto();

    }

    @Override
    public void editMeal(String userId, MealDto mealDto) {
        Optional<Meal> mealOptional = mealDto.getId() == null ? Optional.empty() : mealRepository.findById(mealDto.getId());
        Meal meal = mealOptional.orElseThrow(() -> new NoSuchElementException("Meal Item with name=" + mealDto.getName() + " is not present."));
        meal.setName(mealDto.getName());
        meal.setDescription(mealDto.getDescription());
        meal.setIngredients(mealDto.getIngredients().stream().map(mealItemDto ->
                new MealItem(meal, foodItemRepository.findById(mealItemDto.getFoodItemId()).get(), mealItemDto.getQuantity())).collect(Collectors.toList()));
        mealRepository.save(meal);

    }

    @Override
    public List<MealDto> addMeal(String userId, MealDto mealDto) {
        User user = userRepository.findById(userId).get();
        Meal meal = new Meal();
        meal.setUser(user);
        meal.setName(mealDto.getName());
        meal.setDescription(mealDto.getDescription());
        meal.setQuantity(mealDto.getQuantity());
        meal.setIngredients(mealDto.getIngredients().stream().map(mealItemDto ->
                new MealItem(meal, foodItemRepository.findById(mealItemDto.getFoodItemId()).get(), mealItemDto.getQuantity())).collect(Collectors.toList()));
        mealRepository.save(meal);

        return mealRepository.findByUserId(userId).stream().map(Meal::toDto).collect(Collectors.toList());
    }

    @Override
    public void deleteMeal(String uid, List<Long> idsArray) {
        for (Long id : idsArray) {
            mealRepository.deleteById(id);
        }
    }

    @Override
    public List<MealDto> fetchMeals(String uid) {
        return  mealRepository.findByUserId(uid).stream().map(Meal::toDto).collect(Collectors.toList());
    }

    @Override
    public NutritionStateDto eatMeal(String userId, EatFoodDto eatFoodDto) {
        return null;
    }
}
