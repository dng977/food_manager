package com.dng.foodmanager.domain;

import com.dng.foodmanager.dto.food_dtos.MealDto;
import com.dng.foodmanager.services.FileStorageService;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@NoArgsConstructor
@Table(name = "meals")
public class Meal extends Food {
    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    private Integer quantity;

    private int quantityLeft;

    private Integer servings;

    private String description;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "meal", fetch = FetchType.LAZY)
    private List<MealItem> ingredients;

    public Meal(String name, String imagePath, User user, Integer quantity, int quantityLeft, Integer servings, String description, List<MealItem> ingredients) {
        super(name, imagePath);
        this.user = user;
        this.quantity = quantity;
        this.quantityLeft = quantityLeft;
        this.servings = servings;
        this.description = description;
        this.ingredients = ingredients;
    }

    public MealDto toDto(FileStorageService fileStorageService) {
        byte[] bytesImage = null;
        if (imagePath != null)
            bytesImage = fileStorageService.loadBytesFile(imagePath, false);
        boolean emptyImage = imagePath == null;
        return new MealDto(this.getId(), this.name, this.description, this.quantity, this.quantityLeft, this.servings, ingredients.stream().map(MealItem::toDto).collect(Collectors.toList()), bytesImage, emptyImage);
    }

    public Meal copy(User newUser) {
        Meal newMeal = new Meal(
                this.name,
                this.imagePath,
                newUser,
                this.quantity,
                this.quantityLeft,
                this.servings,
                this.description,
                new ArrayList<>()
                );
        newMeal.ingredients = this.ingredients.stream().map(ing -> ing.copy(newMeal)).collect(Collectors.toList());
        return newMeal;
    }


}
