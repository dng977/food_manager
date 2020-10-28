package com.dng.foodmanager.receiptservice.repositories;

import com.dng.foodmanager.receiptservice.domain.FoodItem;
import com.dng.foodmanager.receiptservice.domain.FoodStock;
import com.dng.foodmanager.receiptservice.domain.FoodStockId;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface FoodStockRepository extends CrudRepository<FoodStock, FoodStockId> {
    @Query(value = "select fs from FoodStock fs where fs.foodItemId=:foodItemId and fs.userId=:userId")
    Optional<FoodStock> findByUserIdAndFoodItemId(String userId, Long foodItemId);

    List<FoodStock> findByUserId(String userId);

}
