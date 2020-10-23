package com.dng.foodmanager.receiptservice.domain;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Table;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Table(name = "life_stage_groups")
@AllArgsConstructor
@NoArgsConstructor
public class LifeStageGroup extends BaseEntity {
    private int lowerLimit;
    private int upperLimit;
    private boolean pregnancy = false;
    private boolean lactation = false;
    private boolean male;
    private String description;
}
