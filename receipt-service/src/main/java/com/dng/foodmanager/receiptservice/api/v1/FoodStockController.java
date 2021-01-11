package com.dng.foodmanager.receiptservice.api.v1;

import com.dng.foodmanager.receiptservice.config.security.CustomPrincipal;
import com.dng.foodmanager.receiptservice.dto.food_dtos.EatFoodDto;
import com.dng.foodmanager.receiptservice.dto.food_dtos.FoodStockDto;
import com.dng.foodmanager.receiptservice.dto.food_dtos.MealDto;
import com.dng.foodmanager.receiptservice.dto.nutrition_dtos.NutritionStateDto;
import com.dng.foodmanager.receiptservice.services.FoodService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLDataException;
import java.util.List;

@Slf4j
@RestController
//@CrossOrigin(value= {"http://localhost:3000"})
@RequestMapping(path = FoodStockController.BASE_URL, produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class FoodStockController {
    public static final String BASE_URL = "/api/v1/foodstock";
    private final FoodService foodService;

    @PutMapping("/items")
    @ResponseStatus(HttpStatus.OK)
    public void editFoodStockItem(@AuthenticationPrincipal CustomPrincipal principal, @RequestBody FoodStockDto foodStockDto) throws SQLDataException {
        

        foodService.editFoodStockItem(principal.getUid(), foodStockDto);
    }

    @GetMapping("/items")
    @ResponseStatus(HttpStatus.OK)
    public List<FoodStockDto> getFoodStock(@AuthenticationPrincipal CustomPrincipal principal){
        

        return foodService.getFoodStock(principal.getUid());
    }


    @DeleteMapping("/items")
    @ResponseStatus(HttpStatus.OK)
    public void deleteFoodStockItems(@AuthenticationPrincipal CustomPrincipal principal, @RequestBody List<Long> idsArray){

        foodService.deleteFoodStockItems(principal.getUid(), idsArray);
    }

    @PostMapping("/items/add")
    @ResponseStatus(HttpStatus.OK)
    public List<FoodStockDto> addItemToFoodStock(@AuthenticationPrincipal CustomPrincipal principal, @RequestBody FoodStockDto foodStockDto) {

        return foodService.addItemToFoodStock(principal.getUid(), foodStockDto);
    }

    @PostMapping("/items/eat")
    @ResponseStatus(HttpStatus.OK)
    public NutritionStateDto eatAnItem(@AuthenticationPrincipal CustomPrincipal principal, @RequestBody EatFoodDto eatFoodDto) {

        return foodService.eat(principal.getUid(), eatFoodDto);
    }

    @GetMapping("/meals")
    @ResponseStatus(HttpStatus.OK)
    public List<MealDto> fetchMeals(@AuthenticationPrincipal CustomPrincipal principal) {

        return foodService.fetchMeals(principal.getUid());
    }

    @PutMapping("/meals")
    @ResponseStatus(HttpStatus.OK)
    public void editMeal(@AuthenticationPrincipal CustomPrincipal principal, @RequestBody MealDto mealDto) {

        foodService.editMeal(principal.getUid(), mealDto);
    }

    @PostMapping("/meals")
    @ResponseStatus(HttpStatus.OK)
    public List<MealDto> addMeal(@AuthenticationPrincipal CustomPrincipal principal, @RequestBody MealDto mealDto) throws NoSuchFieldException {

        return foodService.addMeal(principal.getUid(), mealDto);
    }

    @DeleteMapping("/meals/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteMeal(@AuthenticationPrincipal CustomPrincipal principal, @PathVariable String id) {

        foodService.deleteMeal(principal.getUid(), Long.valueOf(id));
    }
    @PostMapping("/meals/eat")
    @ResponseStatus(HttpStatus.OK)
    public NutritionStateDto eatMeal(@AuthenticationPrincipal CustomPrincipal principal, @RequestBody EatFoodDto eatFoodDto) {

        return foodService.eatMeal(principal.getUid(), eatFoodDto);
    }

}