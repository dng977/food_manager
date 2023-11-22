package com.dng.foodmanager.domain;

import com.dng.foodmanager.dto.food_dtos.WholeFoodDto;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.lang.Nullable;

import java.util.List;
import java.util.Optional;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@NoArgsConstructor
@Table(name = "whole_food")
@ToString
public class WholeFood extends Food {

    private Float defaultQuantity;
    private Float servingSize;
    private String servingDesc;
    private ServingUnit servingUnit;

    @Nullable
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_nutrition_raw")
    private FoodNutrition nutritionRaw;

    @Nullable
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_nutrition_cooked")
    private FoodNutrition nutritionCooked;

//    @OneToMany(mappedBy = "foodItem")
//    private List<FoodItemVariety> foodItemVarieties;

    @OneToMany(mappedBy = "wholeFood")
    private List<FoodReference> referenceWords;

    //column for type


    public Optional<FoodNutrition> getNutritionRaw() {
        return Optional.ofNullable(nutritionRaw);
    }

    public Optional<FoodNutrition> getNutritionCooked() {
        return Optional.ofNullable(nutritionCooked);
    }

    public String getServingDesc() {
        return servingDesc == null ? "" : servingDesc;
    }

    public Float getDefaultQuantity() {
        if(defaultQuantity == null){
            return getServingSize();
        }
        return defaultQuantity;
    }

    public Float getServingSize() {
        if(servingSize == null) {
            return 100f;
        }
            return servingSize;
    }

    public Optional<ServingUnit> getServingUnit() {
        return Optional.ofNullable(servingUnit);
    }

    public WholeFoodDto toDto() {
        return new WholeFoodDto(
                this.getId(),
                this.getName(),
                this.getDefaultQuantity(),
                this.getServingSize(),
                this.getServingDesc(),
                null,
                this.getNutritionRaw().isPresent(),
                this.getNutritionCooked().isPresent()
        );
        //TODO get nutrition as well
    }

}
