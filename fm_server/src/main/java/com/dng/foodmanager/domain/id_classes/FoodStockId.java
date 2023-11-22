package com.dng.foodmanager.domain.id_classes;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@AllArgsConstructor
@EqualsAndHashCode
@NoArgsConstructor
public class FoodStockId implements Serializable {
    private String userId;
    private Long wholeFoodId;
}
