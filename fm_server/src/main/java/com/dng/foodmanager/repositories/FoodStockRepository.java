package com.dng.foodmanager.repositories;

import com.dng.foodmanager.domain.FoodStock;
import com.dng.foodmanager.domain.id_classes.FoodStockId;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface FoodStockRepository extends CrudRepository<FoodStock, FoodStockId> {
    @Query(value = "select fs from FoodStock fs where fs.wholeFoodId=:wholeFoodId and fs.userId=:userId")
    Optional<FoodStock> findByUserIdAndFoodItemId(String userId, Long wholeFoodId);

    List<FoodStock> findByUserId(String userId);

}
