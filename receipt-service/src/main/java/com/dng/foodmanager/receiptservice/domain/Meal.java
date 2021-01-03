package com.dng.foodmanager.receiptservice.domain;

import com.dng.foodmanager.receiptservice.dto.food_dtos.MealDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.stream.Collectors;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "meals")
public class Meal extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    private String name;

    private Integer quantity;

    private int quantityLeft;

    private Integer servings;

    private String description;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "meal", fetch = FetchType.LAZY)
    private List<MealItem> ingredients;

    public Meal(Long id, User user, String name, String description, List<MealItem> ingredients) {
        super(id);
        this.user = user;
        this.name = name;
        this.description = description;
        this.ingredients = ingredients;
    }

    public MealDto toDto(){
        return new MealDto(this.getId(),this.name,this.description,this.quantity, this.quantityLeft,this.servings, ingredients.stream().map(MealItem::toDto).collect(Collectors.toList()));
    }

}
