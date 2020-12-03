package com.dng.foodmanager.receiptservice.api.v1;

import com.dng.foodmanager.receiptservice.config.security.CustomPrincipal;
import com.dng.foodmanager.receiptservice.dto.food_dtos.FoodItemDto;
import com.dng.foodmanager.receiptservice.services.FoodService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@Slf4j
@RestController
//@CrossOrigin(value= {"http://localhost:3000"})
@RequestMapping(path = FoodItemsController.BASE_URL, produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class FoodItemsController {
    public static final String BASE_URL = "/api/v1/fooditems/";
    private final FoodService foodService;

//    @GetMapping("plain/{name}")
//    @ResponseStatus(HttpStatus.OK)
//    public List<FoodItemReceiptDto> getPlainFoodItemsByName(@AuthenticationPrincipal CustomPrincipal principal, @PathVariable String name) throws NumberFormatException, IOException {
//        log.debug(BASE_URL  + name + " GET mapping triggered");
//
//        return foodService.getPlainFoodItemsByName(name);
//    }

    @GetMapping("{name}")
    @ResponseStatus(HttpStatus.OK)
    public List<FoodItemDto> getFoodItemsByName(@AuthenticationPrincipal CustomPrincipal principal, @PathVariable String name) throws NumberFormatException, IOException {
        log.debug(BASE_URL  + name + " GET mapping triggered");

        return foodService.getFoodItemsByName(name);
    }

}