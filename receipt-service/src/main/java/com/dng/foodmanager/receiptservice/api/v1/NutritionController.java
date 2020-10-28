package com.dng.foodmanager.receiptservice.api.v1;

import com.dng.foodmanager.receiptservice.config.security.CustomPrincipal;
import com.dng.foodmanager.receiptservice.dto.ActivityDto;
import com.dng.foodmanager.receiptservice.dto.FoodStockDto;
import com.dng.foodmanager.receiptservice.services.FoodService;
import com.dng.foodmanager.receiptservice.services.NutritionService;
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
@RequestMapping(path = com.dng.foodmanager.receiptservice.api.v1.NutritionController.BASE_URL, produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class NutritionController {

        public static final String BASE_URL = "/api/v1/nutrition";
        private final NutritionService nutritionService;


        @GetMapping("/activity")
        @ResponseStatus(HttpStatus.OK)
        public List<ActivityDto> getActivityFactors(){

            return nutritionService.getActivities();
        }
}
