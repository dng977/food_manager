package com.dng.foodmanager.repositories;

import com.dng.foodmanager.domain.FoodHistory;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.time.Instant;
import java.util.List;

public interface FoodHistoryRepository extends CrudRepository<FoodHistory, Long> {
    @Query("select n from FoodHistory n where n.date > :date and n.user.userId = :userId")
    List<FoodHistory> findByUserIdAndDate(String userId, Instant date);
}
