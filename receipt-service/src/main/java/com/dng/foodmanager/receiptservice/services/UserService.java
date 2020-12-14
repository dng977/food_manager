package com.dng.foodmanager.receiptservice.services;

import com.dng.foodmanager.receiptservice.dto.UserDto;

public interface UserService {
    void updateUser(String uid, UserDto userDto);
}
