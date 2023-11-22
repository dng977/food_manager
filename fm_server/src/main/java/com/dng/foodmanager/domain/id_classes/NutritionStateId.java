package com.dng.foodmanager.domain.id_classes;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.Instant;

@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class NutritionStateId implements Serializable {
    private String userId;
    private Instant date;

}
