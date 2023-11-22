package com.dng.foodmanager.repositories;

import com.dng.foodmanager.domain.Meal;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MealRepository extends CrudRepository<Meal, Long> {
    @Query("select m from Meal m where m.user.userId = ?1")
    List<Meal> findByUserId(String userId);

}
