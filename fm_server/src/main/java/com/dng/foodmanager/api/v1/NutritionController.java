package com.dng.foodmanager.api.v1;

import com.dng.foodmanager.config.security.CustomPrincipal;
import com.dng.foodmanager.dto.ActivityDto;
import com.dng.foodmanager.dto.ChronoUnit;
import com.dng.foodmanager.dto.nutrition_dtos.NutritionRdaDto;
import com.dng.foodmanager.dto.nutrition_dtos.NutritionStateDto;
import com.dng.foodmanager.services.NutritionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(path = NutritionController.BASE_URL, produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class NutritionController {

    public static final String BASE_URL = "/api/v1/nutrition";
    private final NutritionService nutritionService;


    @GetMapping("/activity")
    @ResponseStatus(HttpStatus.OK)
    public List<ActivityDto> fetchActivityFactors() {
        return nutritionService.getActivities();
    }

    @GetMapping("/state")
    @ResponseStatus(HttpStatus.OK)
    public NutritionStateDto fetchNutritionState(@AuthenticationPrincipal CustomPrincipal principal, @RequestParam(required = false) Integer timeAgo, @RequestParam(required = false) ChronoUnit chronoUnit) {

        return nutritionService.getNutritionStateDto(principal.getUid(), timeAgo, chronoUnit);

    }

    @GetMapping("/rda")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public NutritionRdaDto fetchNutritionRda(@AuthenticationPrincipal CustomPrincipal principal) {

        return nutritionService.getNutritionRda(principal.getUid());
    }


}
