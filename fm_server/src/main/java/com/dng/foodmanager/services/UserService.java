package com.dng.foodmanager.services;

import com.dng.foodmanager.dto.UserDto;

public interface UserService {
    void updateUser(String uid, UserDto userDto);

    void loadUser(String uid);
}
