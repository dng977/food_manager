package com.dng.foodmanager.domain;

import jakarta.persistence.*;
import lombok.Getter;



@Getter
@Entity
@Table(name = "food_dictionary")
public class FoodReference extends BaseEntity {

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_wholeFood")
    private WholeFood wholeFood;

    private String referenceWord;
}
