package com.dng.foodmanager.api.v1;

import com.dng.foodmanager.config.security.CustomPrincipal;
import com.dng.foodmanager.dto.food_dtos.WholeFoodDto;
import com.dng.foodmanager.services.WholeFoodService;
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
@RequestMapping(path = WholeFoodController.BASE_URL, produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class WholeFoodController {
    public static final String BASE_URL = "/api/v1/wholefood/";
    private final WholeFoodService wholeFoodService;

//    @GetMapping("plain/{name}")
//    @ResponseStatus(HttpStatus.OK)
//    public List<FoodItemReceiptDto> getPlainFoodItemsByName(@AuthenticationPrincipal CustomPrincipal principal, @PathVariable String name) throws NumberFormatException, IOException {
//        log.debug(BASE_URL  + name + " GET mapping triggered");
//
//        return foodService.getPlainFoodItemsByName(name);
//    }

    @GetMapping("{name}")
    @ResponseStatus(HttpStatus.OK)
    public List<WholeFoodDto> getFoodItemsByName(@AuthenticationPrincipal CustomPrincipal principal, @PathVariable String name) throws NumberFormatException, IOException {
        log.debug(BASE_URL  + name + " GET mapping triggered");

        return wholeFoodService.getFoodItemsByName(name);
    }

}