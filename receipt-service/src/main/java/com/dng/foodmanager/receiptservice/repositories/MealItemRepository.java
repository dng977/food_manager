package com.dng.foodmanager.receiptservice.repositories;

import com.dng.foodmanager.receiptservice.domain.Meal;
import com.dng.foodmanager.receiptservice.domain.MealItem;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface MealItemRepository extends CrudRepository<MealItem, Long> {

    @Modifying
    @Query(value = "delete from MealItem mi where mi.meal.id = :mealId")
    void deleteAllByMeal(@Param("mealId") Long mealId);

}
