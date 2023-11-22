package com.dng.foodmanager.services;

import com.dng.foodmanager.domain.User;
import com.dng.foodmanager.dto.food_dtos.MealDto;
import com.dng.foodmanager.dto.nutrition_dtos.NutritionStateDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface MealService extends FoodService {
    void editMeal(String userId, MealDto mealDto, MultipartFile mealImage) throws IOException;

    List<MealDto> addMeal(String userId, MealDto mealDto, MultipartFile mealImage) throws IOException;

    void deleteMeal(String uid, Long mealId);

    List<MealDto> fetchMeals(String uid);

    NutritionStateDto fetchMealNutrition(String uid, Long id);

    void loadDefaultMeals(User newUser, String adminUID);
}
