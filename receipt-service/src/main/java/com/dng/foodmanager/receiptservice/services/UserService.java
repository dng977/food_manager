package com.dng.foodmanager.receiptservice.services;

import com.dng.foodmanager.receiptservice.dto.ReceiptDto;
import com.dng.foodmanager.receiptservice.dto.UserDto;

import java.util.List;

public interface UserService {
    void addNewUser(String uid, UserDto userDto);
}
