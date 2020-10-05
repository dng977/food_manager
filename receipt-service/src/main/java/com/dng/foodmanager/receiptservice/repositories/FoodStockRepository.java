package com.dng.foodmanager.receiptservice.repositories;

import com.dng.foodmanager.receiptservice.domain.FoodItem;
import com.dng.foodmanager.receiptservice.domain.FoodStock;
import org.springframework.data.repository.CrudRepository;

public interface FoodStockRepository extends CrudRepository<FoodStock, Long> {
}
