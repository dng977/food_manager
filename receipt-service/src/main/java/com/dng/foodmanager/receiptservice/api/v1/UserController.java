package com.dng.foodmanager.receiptservice.api.v1;

import com.dng.foodmanager.receiptservice.config.security.CustomPrincipal;
import com.dng.foodmanager.receiptservice.dto.ReceiptDto;
import com.dng.foodmanager.receiptservice.dto.UserDto;
import com.dng.foodmanager.receiptservice.services.ReceiptService;
import com.dng.foodmanager.receiptservice.services.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
//@CrossOrigin(value= {"http://localhost:3000"})
@RequestMapping(path = UserController.BASE_URL, produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {

    public static final String BASE_URL = "/api/v1/users";

    private final UserService userService;


    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public void addNewUser(@AuthenticationPrincipal CustomPrincipal principal, @RequestBody UserDto userDto) {
        userService.addNewUser(principal.getUid(), userDto);
    }
}