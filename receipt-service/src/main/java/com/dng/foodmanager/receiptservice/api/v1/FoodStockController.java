package com.dng.foodmanager.receiptservice.api.v1;

import com.dng.foodmanager.receiptservice.config.security.CustomPrincipal;
import com.dng.foodmanager.receiptservice.domain.NutritionState;
import com.dng.foodmanager.receiptservice.dto.*;
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

    @PutMapping("/item")
    @ResponseStatus(HttpStatus.OK)
    public void editFoodStockItem(@AuthenticationPrincipal CustomPrincipal principal, @RequestBody FoodStockDto foodStockDto) throws SQLDataException {
        

        foodService.editFoodStockItem(principal.getUid(), foodStockDto);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<FoodStockDto> getFoodStock(@AuthenticationPrincipal CustomPrincipal principal){
        

        return foodService.getFoodStock(principal.getUid());
    }


    @DeleteMapping
    @ResponseStatus(HttpStatus.OK)
    public void deleteFoodStockItems(@AuthenticationPrincipal CustomPrincipal principal, @RequestBody List<Long> idsArray){

        foodService.deleteFoodStockItems(principal.getUid(), idsArray);
    }

    @PostMapping("/item/add")
    @ResponseStatus(HttpStatus.OK)
    public List<FoodStockDto> addItemToFoodStock(@AuthenticationPrincipal CustomPrincipal principal, @RequestBody PlainFoodStockDto plainFoodStockDto) throws SQLDataException {

        return foodService.addItemToFoodStock(principal.getUid(), plainFoodStockDto);
    }

    @PostMapping("/item/eat")
    @ResponseStatus(HttpStatus.OK)
    public NutritionState eatAnItem(@AuthenticationPrincipal CustomPrincipal principal, @RequestBody EatFoodStockDto eatFoodStockDto) throws SQLDataException {

        return foodService.eat(principal.getUid(), eatFoodStockDto);
    }

}