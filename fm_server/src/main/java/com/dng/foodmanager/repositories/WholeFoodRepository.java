package com.dng.foodmanager.repositories;

import com.dng.foodmanager.domain.WholeFood;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface WholeFoodRepository extends CrudRepository<WholeFood, Long> {
    Optional<WholeFood> findByName(String name);
    List<WholeFood> findByNameLike(String name);
}
