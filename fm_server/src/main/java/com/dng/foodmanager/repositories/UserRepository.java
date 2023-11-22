package com.dng.foodmanager.repositories;

import com.dng.foodmanager.domain.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, String> {

}
