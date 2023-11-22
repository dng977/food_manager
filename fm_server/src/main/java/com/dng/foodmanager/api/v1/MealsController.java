package com.dng.foodmanager.api.v1;

import com.dng.foodmanager.config.security.CustomPrincipal;
import com.dng.foodmanager.dto.food_dtos.EatFoodDto;
import com.dng.foodmanager.dto.food_dtos.MealDto;
import com.dng.foodmanager.dto.nutrition_dtos.NutritionStateDto;
import com.dng.foodmanager.services.MealService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
@Slf4j
@RestController
@RequestMapping(path = MealsController.BASE_URL, produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class MealsController {

    public static final String BASE_URL = "/api/v1/meals";
    private final MealService mealService;


    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<MealDto> fetchMeals(@AuthenticationPrincipal CustomPrincipal principal) {

        return mealService.fetchMeals(principal.getUid());
    }

    @PutMapping(consumes = { "multipart/form-data" })
    @ResponseStatus(HttpStatus.OK)
    public void editMeal(@AuthenticationPrincipal CustomPrincipal principal,
                         @RequestPart(value = "mealImage", required = false) MultipartFile mealImage,
                         @RequestPart("mealDto") MealDto mealDto) throws IOException {

        mealService.editMeal(principal.getUid(), mealDto, mealImage);
    }

    @PostMapping(consumes = { "multipart/form-data" })
    @ResponseStatus(HttpStatus.OK)
    public List<MealDto> addMeal(@AuthenticationPrincipal CustomPrincipal principal,
                                 @RequestPart(value = "mealImage", required = false) MultipartFile mealImage,
                                 @RequestPart("mealDto") MealDto mealDto) throws IOException {

        log.debug(mealDto.toString());
        return mealService.addMeal(principal.getUid(), mealDto, mealImage);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteMeal(@AuthenticationPrincipal CustomPrincipal principal, @PathVariable String id) {
        mealService.deleteMeal(principal.getUid(), Long.valueOf(id));
    }
    @PostMapping("/eat")
    @ResponseStatus(HttpStatus.OK)
    public NutritionStateDto eatMeal(@AuthenticationPrincipal CustomPrincipal principal, @RequestBody EatFoodDto eatFoodDto) {
        return mealService.eat(principal.getUid(), eatFoodDto);
    }

    @GetMapping("/{id}/nutrition")
    @ResponseStatus(HttpStatus.OK)
    public NutritionStateDto fetchMealNutrition(@AuthenticationPrincipal CustomPrincipal principal, @PathVariable String id) {
        return mealService.fetchMealNutrition(principal.getUid(), Long.valueOf(id));
    }

}
