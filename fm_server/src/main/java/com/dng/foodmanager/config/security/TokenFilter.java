package com.dng.foodmanager.config.security;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.Optional;

@Slf4j
public class TokenFilter extends OncePerRequestFilter {

    @Autowired
    private SecurityUtils securityUtils;

    public Optional<String> readCookie(HttpServletRequest request, String key) {
        if(request.getCookies()!=null){
            return Arrays.stream(request.getCookies())
                    .filter(c -> key.equals(c.getName()))
                    .map(Cookie::getValue)
                    .findAny();
        }else{
            return Optional.empty();
        }

    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        FirebaseToken decodedToken = null;

        //Cookie
//        Optional<String> sessionCookie = readCookie(request, "session");
//        if(sessionCookie.isPresent()) {
        try {
//                final boolean checkRevoked = true;
//                decodedToken = FirebaseAuth.getInstance().verifySessionCookie(sessionCookie.get(), checkRevoked);

            String idToken = securityUtils.getTokenFromRequest(request);
            decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
        } catch (FirebaseAuthException | IllegalArgumentException e) {
            log.error("Firebase Exception {}", e.getLocalizedMessage());
        }
        if (decodedToken != null) {
            CustomPrincipal customPrincipal = new CustomPrincipal();
            customPrincipal.setUid(decodedToken.getUid());
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                    customPrincipal, decodedToken, null);
            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
//        }
        filterChain.doFilter(request, response);
    }
}