package com.dng.foodmanager.bootstrap;

import com.dng.foodmanager.domain.User;
import com.dng.foodmanager.dto.food_dtos.FoodStockDto;
import com.dng.foodmanager.repositories.UserRepository;
import com.dng.foodmanager.services.MealService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.firebase.auth.ExportedUserRecord;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.ListUsersPage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import org.springframework.util.ResourceUtils;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataLoader implements ApplicationRunner {
    @Value("${spring.datasource.url}")
    private String url;

    @Value("${spring.datasource.username}")
    private String username;

    @Value("${spring.datasource.password}")
    private String password;

    @Value("${spring.jpa.hibernate.ddl-auto}")
    private String autoDDL;
    @Value("adminUID")
    private String adminUID;

    private final DataConfigProperties dataConfigProperties;
    private final UserRepository userRepository;
    private final MealService mealService;

    @Override
    public void run(ApplicationArguments args) {
        log.info("----Loading data----");
        loadFromDatabase();

        log.info("----Loading users----");
        syncUsers();

//        log.info("----Creating Json DTOs----");
//        createJsonDtos();

    }

    private void createJsonDtos() {
        if (autoDDL.equals("create")) {
            try {
                String json = new ObjectMapper().writeValueAsString(new FoodStockDto());
                Files.writeString(Path.of("src/main/resources/data/json_dto/FoodStockDto.json"), json);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    private void loadFromDatabase() {

        String[] dataPaths = dataConfigProperties.getData().stream().filter(dataMap -> {
            if (autoDDL.equals("update")) {
                return Boolean.parseBoolean(dataMap.get("runOnUpdate"));
            } else
                return true;
        }).map(dataMap -> dataMap.get("path")).toArray(String[]::new);
        log.debug(Arrays.toString(dataPaths));

        for (String path : dataPaths) {
            log.info("----Executing: " + path + " ----");
            String sqlStatement;
            try {
                sqlStatement = Files.readString(ResourceUtils.getFile("classpath:" + path).toPath());
            } catch (IOException e) {
                log.error("SQL Statement could not be loaded!");
                return;
            }
            try (
                    Connection connection = DriverManager.getConnection(url, username, password);
                    Statement stmt = connection.createStatement();
            ) {
                int a = stmt.executeUpdate(sqlStatement);
                log.info("Success! return code: " + a);
            } catch (SQLException e) {
                log.error("SQL statement " + path + " failed !:\n " + e.getMessage());
            }
        }


    }

    private void syncUsers() {
        try {
            ListUsersPage page = FirebaseAuth.getInstance().listUsers(null);
            List<User> usersInDB = new ArrayList<>();
            userRepository.findAll().forEach(usersInDB::add);
            while (page != null) {
                for (ExportedUserRecord firebaseUser : page.getValues()) {
                    String userId = firebaseUser.getUid();
                    //Remove user from list if exists otherwise add to DB
                    if (!usersInDB.removeIf(user -> user.getUserId().equals(userId))) {
                        User newUser = new User(userId);
                        if (userId.equals(adminUID)) {
                            newUser.setAdmin(true);
                        }
                        userRepository.save(new User(userId));
                        mealService.loadDefaultMeals(newUser, adminUID);
                        log.info("----User: " + userId + " has been loaded!----");
                    }
                }
                page = page.getNextPage();
            }
            //delete users that are not in sync with firebase
            usersInDB.forEach(user -> {
                log.info("----User: " + user.getUserId() + " is not in sync with FB - gets deleted!----");
                userRepository.deleteById(user.getUserId());
            });
        } catch (FirebaseAuthException e) {
            e.printStackTrace();
        }
    }


}
