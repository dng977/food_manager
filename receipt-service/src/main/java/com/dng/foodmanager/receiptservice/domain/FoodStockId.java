package com.dng.foodmanager.receiptservice.domain;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Id;
import java.io.Serializable;

@AllArgsConstructor
@EqualsAndHashCode
@NoArgsConstructor
public class FoodStockId implements Serializable {
    private String userId;
    private Long foodItemId;
}
