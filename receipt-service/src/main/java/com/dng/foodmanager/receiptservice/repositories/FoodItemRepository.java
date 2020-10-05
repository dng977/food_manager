package com.dng.foodmanager.receiptservice.repositories;

import com.dng.foodmanager.receiptservice.domain.FoodItem;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface FoodItemRepository extends CrudRepository<FoodItem, Long> {
    Optional<FoodItem> findByName(String name);
    List<FoodItem> findByNameLike(String name);
}
