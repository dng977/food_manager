package com.dng.foodmanager.services;

import com.dng.foodmanager.domain.*;
import com.dng.foodmanager.dto.food_dtos.EatFoodDto;
import com.dng.foodmanager.dto.food_dtos.MealDto;
import com.dng.foodmanager.dto.nutrition_dtos.NutritionStateDto;
import com.dng.foodmanager.repositories.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class MealServiceImpl implements MealService {
    private final WholeFoodRepository wholeFoodRepository;
    private final NutritionStateRepository nutritionStateRepository;
    private final UserRepository userRepository;
    private final MealRepository mealRepository;
    private final MealItemRepository mealItemRepository;
    private final FileStorageService firebaseStorage;
    private final FoodHistoryService foodHistoryService;


    @Override
    public NutritionStateDto eat(String userId, EatFoodDto eatFoodDto) {
        log.debug("EAT MEAL METHOD");
        //1) Remove eaten meal
        Meal meal = getMealFromRepository(eatFoodDto.getFoodId());

        int amountEaten = eatFoodDto.getQuantity();

        int oldQuantity = meal.getQuantityLeft();
        if (oldQuantity < amountEaten)
            throw new IllegalArgumentException("The food hasn't got sufficient quantity.");

        meal.setQuantityLeft(oldQuantity - amountEaten);
        mealRepository.save(meal);


        //2) Set nutrition

        NutritionState nutritionState;
        Optional<NutritionState> nutritionStateOptional = nutritionStateRepository.findByUserIdAndDate(userId, Instant.now()); //todays date - must be fixed to get users locale
        //If there is already such state
        nutritionState = nutritionStateOptional.orElseGet(() -> new NutritionState(userId, Instant.now()));
        for (MealItem mealItem : meal.getIngredients()) {
            log.debug("mealItem quantity : " + mealItem.getQuantity());
            log.debug("meal quantity : " + meal.getQuantity());
            log.debug("amountEaten: " + amountEaten);

            int proportionalItemQuantity = (int) ((mealItem.getQuantity().floatValue() / meal.getQuantity().floatValue()) * amountEaten);
            log.debug("Prop item quantity:  " + proportionalItemQuantity);
            updateNutritionStateForWholeFood(nutritionState, mealItem.getWholeFood(), proportionalItemQuantity, mealItem.isCooked());
        }
        nutritionStateRepository.save(nutritionState);



        //Add meal to history
        FoodHistory mealHistory =
            FoodHistory.builder()
                .meal(meal)
                .user(userRepository.findById(userId).orElseThrow())
                .date(Instant.now())
                .quantity(amountEaten)
                .cooked(true).build();




        foodHistoryService.addFoodHistory(mealHistory);



        return nutritionState.convertToDto();
    }




    private Meal getMealFromRepository(Long mealId) throws NoSuchElementException {
        Optional<Meal> mealOptional = mealId == null ? Optional.empty() : mealRepository.findById(mealId);
        Meal meal = mealOptional.orElseThrow(() -> new NoSuchElementException("Meal Item with id=" + mealId + " is not present."));
        return meal;
    }

    @Transactional
    @Override
    public void editMeal(String userId, MealDto mealDto, MultipartFile mealImage) throws IOException {
        Meal meal = getMealFromRepository(mealDto.getId());
        if (mealDto.getName().isPresent()) meal.setName(mealDto.getName().get());
        if (mealDto.getDescription().isPresent()) meal.setDescription(mealDto.getDescription().get());
        if (mealDto.getQuantity().isPresent()) meal.setQuantity(mealDto.getQuantity().get());
        if (mealDto.getQuantityLeft().isPresent()) meal.setQuantityLeft(mealDto.getQuantityLeft().get());
        if (mealDto.getServings().isPresent()) meal.setServings(mealDto.getServings().get());

        List<MealItem> oldIngredients = meal.getIngredients();
        List<Long> modifiedIngredientsIds = new ArrayList<>();
        if (mealDto.getIngredients().isPresent()){
            meal.setIngredients(mealDto.getIngredients().get().stream().map(mealItemDto -> {
                MealItem modifiedIngredient;
                Optional<MealItem> mealItemOptional = oldIngredients.stream().filter(mealItem -> mealItem.getWholeFood().getId() == mealItemDto.getWholeFoodDto().getId()).findFirst();
                if(mealItemOptional.isPresent()){
                    modifiedIngredient = mealItemOptional.get();
                    modifiedIngredient.updateMealItem(mealItemDto.isCooked(), mealItemDto.getQuantity());
                }else{
                    modifiedIngredient =  new MealItem(meal, wholeFoodRepository.findById(mealItemDto.getWholeFoodDto().getId()).orElseThrow(), mealItemDto.isCooked(), mealItemDto.getQuantity());
                }
                modifiedIngredientsIds.add(modifiedIngredient.getId());
                return modifiedIngredient;
            }).collect(Collectors.toList()));

            //Each mealId that is not inside the modifiedIngredientIds will be deleted

            mealItemRepository.deleteAll(oldIngredients.stream().filter(mealItem -> ! modifiedIngredientsIds.contains(mealItem.getId())).collect(Collectors.toList()));
        }

        mealRepository.save(meal);

        //Image
        String imagePath = meal.getImagePath();

        if(mealImage != null){
            String filePath = firebaseStorage.createFilePathName(FileStorageService.ObjectType.MEAL, userId, meal.getId());
            if(imagePath != null){
                //Delete old file
                firebaseStorage.deleteFile(imagePath);
            }else{
                meal.setImagePath(filePath);
            }
            firebaseStorage.storeFile(mealImage.getBytes(), filePath);

            //don't change old image path

        }else if(mealDto.getEmptyImage().get() && imagePath != null){
            firebaseStorage.deleteFile(imagePath);
            meal.setImagePath(null);
        }

        mealRepository.save(meal);

    }

    @Override
    public List<MealDto> addMeal(String userId, MealDto mealDto, MultipartFile mealImage) throws IOException {
        User user = userRepository.findById(userId).orElseThrow();
        Meal meal = new Meal();
        meal.setUser(user);
        meal.setName(mealDto.getName().orElse("-"));
        meal.setDescription(mealDto.getDescription().orElse("-"));
        int quantity = mealDto.getQuantity().orElseThrow(() -> new IllegalArgumentException("No quantity provided"));
        meal.setQuantity(quantity);
        meal.setQuantityLeft(quantity);
        meal.setServings(mealDto.getServings().orElseThrow(() -> new IllegalArgumentException("No servings provided")));
        meal.setIngredients(mealDto.getIngredients().orElse(List.of()).stream().map(mealItemDto ->
                new MealItem(meal, wholeFoodRepository.findById(mealItemDto.getWholeFoodDto().getId()).orElseThrow(), mealItemDto.isCooked(), mealItemDto.getQuantity())).collect(Collectors.toList()));
        meal.setImagePath(null);
        //meal gets id after it is saved
        mealRepository.save(meal);

        if(mealImage != null){
            String filePath = firebaseStorage.createFilePathName(FileStorageService.ObjectType.MEAL, userId, meal.getId());
            firebaseStorage.storeFile(mealImage.getBytes(), filePath);
            meal.setImagePath(filePath);
            mealRepository.save(meal);
        }

        return mealRepository.findByUserId(userId).stream().map(meal1 -> meal1.toDto(firebaseStorage)).collect(Collectors.toList());
    }

    @Transactional
    @Override
    public void deleteMeal(String uid, Long mealId) {
        //TODO - Impl reset seedid
        Optional<Meal> meal = mealRepository.findById(mealId);
        meal.ifPresent(value -> firebaseStorage.deleteFile(value.getImagePath()));
        mealRepository.deleteById(mealId);
//        firebaseStorage.deleteFile(firebaseStorage.createFilePathName(FileStorageService.ObjectType.MEAL, uid, mealId));

    }

    @Override
    public List<MealDto> fetchMeals(String uid) {
        return mealRepository.findByUserId(uid).stream().map(meal -> meal.toDto(firebaseStorage)).collect(Collectors.toList());
    }

    @Override
    public NutritionStateDto fetchMealNutrition(String uid, Long id) {
        Meal meal = getMealFromRepository(id);
        log.debug("MEAL: ", meal.toString());
        NutritionState nutritionState = new NutritionState(uid, Instant.now());
        for (MealItem mealItem : meal.getIngredients()) {
            log.debug("mealItem quantity : " + mealItem.getQuantity());
            log.debug("meal quantity : " + meal.getQuantity());
            log.debug("mealItem: ", mealItem.toString());

            int quantity = mealItem.getQuantity() / meal.getServings();
            log.debug("Prop item quantity:  " + quantity);
            updateNutritionStateForWholeFood(nutritionState, mealItem.getWholeFood(), mealItem.getQuantity() / meal.getServings(), mealItem.isCooked());
        }
        System.out.println("NUTRITION STATE:");
        System.out.println(nutritionState.getEnergy_kcal());
        System.out.println(nutritionState.getCalcium_mg());

        return nutritionState.convertToDto();
    }

    @Override
    public void loadDefaultMeals(User newUser, String adminUID) {
        if(!newUser.getAdmin()){
            List<Meal> defaultMeals = mealRepository.findByUserId(adminUID);
            List<Meal> newUserMeals = defaultMeals.stream().map(meal -> meal.copy(newUser)).collect(Collectors.toList());
            mealRepository.saveAll(newUserMeals);
        }

    }
}
