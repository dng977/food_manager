package com.dng.foodmanager.receiptservice.domain;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.util.Date;

@AllArgsConstructor
@EqualsAndHashCode
public class NutritionStateId implements Serializable {
    private String userId;
    private Date date;

}
