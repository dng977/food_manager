package com.dng.foodmanager.api.v1;

import com.dng.foodmanager.config.security.CustomPrincipal;
import com.dng.foodmanager.dto.food_dtos.FoodHistoryDto;
import com.dng.foodmanager.services.FoodHistoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(path = FoodHistoryController.BASE_URL, produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class FoodHistoryController {

    public static final String BASE_URL = "/api/v1/foodhistory";
    private final FoodHistoryService foodHistoryService;

    @GetMapping("{daysAgo}")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public List<FoodHistoryDto> fetchFoodHistory(@AuthenticationPrincipal CustomPrincipal principal, @PathVariable Integer daysAgo){
        return foodHistoryService.getFoodHistory(principal.getUid(),daysAgo);
    }


}
