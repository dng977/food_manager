package com.dng.foodmanager.api.v1;

import com.dng.foodmanager.config.security.CustomPrincipal;
import com.dng.foodmanager.config.security.SecurityUtils;
import com.dng.foodmanager.dto.UserDto;
import com.dng.foodmanager.services.UserService;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.SessionCookieOptions;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.TimeUnit;

@Slf4j
@RestController
@RequiredArgsConstructor
//@CrossOrigin(value= {"http://localhost:3000"})
@RequestMapping(path = UserController.BASE_URL, produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {

    public static final String BASE_URL = "/api/v1/users";

    private final SecurityUtils securityUtils;
    private final UserService userService;


    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public void updateUser(@AuthenticationPrincipal CustomPrincipal principal, @RequestBody UserDto userDto) {
        userService.updateUser(principal.getUid(), userDto);
    }

    @PostMapping("/login")
    public ResponseEntity<String> createSessionCookie(HttpServletRequest request, HttpServletResponse response){
        String idToken = securityUtils.getTokenFromRequest(request);
        long expiresIn = TimeUnit.DAYS.toMillis(2);
        SessionCookieOptions options = SessionCookieOptions.builder()
                .setExpiresIn(expiresIn)
                .build();
        try{
            String sessionCookie = FirebaseAuth.getInstance().createSessionCookie(idToken,options);
            Cookie cookie = new Cookie("session", sessionCookie);
            cookie.setHttpOnly(true);
//            cookie.setSecure(true);
            response.addCookie(cookie);
            return ResponseEntity.ok("Cookie creation success");
        } catch (FirebaseAuthException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Failed to create a session cookie");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<Object> clearSessionCookie(@CookieValue("session") Cookie cookie){
        Cookie newCookie = new Cookie(cookie.getName(), null);
        newCookie.setMaxAge(0);
        cookie.setSecure(true);
        cookie.setHttpOnly(true);
        return ResponseEntity.ok(newCookie);
    }

}