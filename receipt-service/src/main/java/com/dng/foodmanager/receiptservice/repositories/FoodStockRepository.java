package com.dng.foodmanager.receiptservice.repositories;

import com.dng.foodmanager.receiptservice.domain.FoodItem;
import com.dng.foodmanager.receiptservice.domain.FoodStock;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface FoodStockRepository extends CrudRepository<FoodStock, Long> {
    @Modifying
    @Query(value = "DECLARE @maxVal INT;\n" +
            "SELECT @maxVal = ISNULL(max(ID),0) from food_stock;\n" +
            "DBCC CHECKIDENT(food_stock, RESEED, @maxVal);", nativeQuery = true)
    void resetIdSeed();

    @Query(value = "select fs from FoodStock fs where fs.foodItem.id=:foodItemId and fs.userId=:userId")
    Optional<FoodStock> findByUserIdAndFoodItemId(String userId, Long foodItemId);

    List<FoodStock> findByUserId(String userId);

}
