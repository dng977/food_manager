package com.dng.foodmanager.api.v1;

import com.dng.foodmanager.config.security.CustomPrincipal;
import com.dng.foodmanager.dto.food_dtos.EatFoodDto;
import com.dng.foodmanager.dto.food_dtos.FoodStockDto;
import com.dng.foodmanager.dto.nutrition_dtos.NutritionStateDto;
import com.dng.foodmanager.services.WholeFoodService;
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
    private final WholeFoodService wholeFoodService;

    @PutMapping("/items")
    @ResponseStatus(HttpStatus.OK)
    public void editFoodStockItem(@AuthenticationPrincipal CustomPrincipal principal, @RequestBody FoodStockDto foodStockDto) throws SQLDataException {
        

        wholeFoodService.editFoodStockItem(principal.getUid(), foodStockDto);
    }

    @GetMapping("/items")
    @ResponseStatus(HttpStatus.OK)
    public List<FoodStockDto> getFoodStock(@AuthenticationPrincipal CustomPrincipal principal){
        

        return wholeFoodService.getFoodStock(principal.getUid());
    }


    @DeleteMapping("/items")
    @ResponseStatus(HttpStatus.OK)
    public void deleteFoodStockItems(@AuthenticationPrincipal CustomPrincipal principal, @RequestBody List<Long> idsArray){

        wholeFoodService.deleteFoodStockItems(principal.getUid(), idsArray);
    }

    @PostMapping("/items/add")
    @ResponseStatus(HttpStatus.OK)
    public List<FoodStockDto> addItemToFoodStock(@AuthenticationPrincipal CustomPrincipal principal, @RequestBody FoodStockDto foodStockDto) {

        return wholeFoodService.addItemToFoodStock(principal.getUid(), foodStockDto);
    }

    @PostMapping("/items/eat")
    @ResponseStatus(HttpStatus.OK)
    public NutritionStateDto eatAnItem(@AuthenticationPrincipal CustomPrincipal principal, @RequestBody EatFoodDto eatFoodDto) {

        return wholeFoodService.eat(principal.getUid(), eatFoodDto);
    }



}