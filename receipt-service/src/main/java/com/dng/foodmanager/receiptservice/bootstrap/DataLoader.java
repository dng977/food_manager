package com.dng.foodmanager.receiptservice.bootstrap;

import com.dng.foodmanager.receiptservice.domain.User;
import com.dng.foodmanager.receiptservice.repositories.UserRepository;
import com.google.firebase.auth.ExportedUserRecord;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.ListUsersPage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import org.springframework.test.context.jdbc.Sql;

import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataLoader implements ApplicationRunner {

    private final UserRepository userRepository;

    @Override
    public void run(ApplicationArguments args) {

        log.info("----Loading users----");
        try {
            ListUsersPage page = FirebaseAuth.getInstance().listUsers(null);
            while(page!=null){
                for(ExportedUserRecord user: page.getValues()){
                    String userId = user.getUid();
                    Optional<User> userOptional = userRepository.findById(userId);
                    if(!userOptional.isPresent()){
                        userRepository.save(new User(userId));
                        log.info("----User: " + userId + " has been loaded!----");

                    }
                }
                page = page.getNextPage();
            }
        } catch (FirebaseAuthException e) {
            e.printStackTrace();
        }

    }


}
