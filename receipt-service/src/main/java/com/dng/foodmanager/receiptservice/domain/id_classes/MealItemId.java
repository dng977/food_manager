package com.dng.foodmanager.receiptservice.domain.id_classes;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@AllArgsConstructor
@EqualsAndHashCode
@NoArgsConstructor
public class MealItemId implements Serializable {
    private Long mealId;
    private Long foodItemId;
}
