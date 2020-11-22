package com.dng.foodmanager.receiptservice.domain.id_classes;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class NutritionStateId implements Serializable {
    private String userId;
    private LocalDate date;

}
