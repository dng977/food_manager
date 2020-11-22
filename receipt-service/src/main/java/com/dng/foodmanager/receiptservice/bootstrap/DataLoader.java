package com.dng.foodmanager.receiptservice.bootstrap;

import com.dng.foodmanager.receiptservice.domain.User;
import com.dng.foodmanager.receiptservice.repositories.UserRepository;
import com.google.firebase.auth.ExportedUserRecord;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.ListUsersPage;
import com.microsoft.sqlserver.jdbc.SQLServerDriver;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.util.ResourceUtils;

import java.io.IOException;
import java.nio.file.Files;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataLoader implements ApplicationRunner {
    @Value("${spring.datasource.driverClassName}")
    private String driverClassName;

    @Value("${spring.datasource.url}")
    private String url;

    @Value("${spring.datasource.username}")
    private String username;

    @Value("${spring.datasource.password}")
    private String password;

    @Value("${spring.jpa.hibernate.ddl-auto}")
    private String autoDDL;

    private final DataConfigProperties dataConfigProperties;
    private final UserRepository userRepository;

    @Override
    public void run(ApplicationArguments args) {
        log.info("----Loading data----");
        loadFromDatabase();

        log.info("----Loading users----");
        loadUsers();


    }

    private void loadFromDatabase() {
        try {

            String[] dataPaths = dataConfigProperties.getData().stream().filter(dataMap -> {
                if(autoDDL.equals("update")) {
                    if(Boolean.parseBoolean(dataMap.get("runOnUpdate")))
                        return true;
                    else
                        return false;
                }else
                return true;
            }).map(dataMap -> dataMap.get("path")).toArray(String[]::new);
            log.debug(Arrays.toString(dataPaths));
            Class.forName(driverClassName);

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
                    log.debug("Success! return code: " + a);
                } catch (SQLException e) {
                    log.error("SQL statement " + path + " failed !:\n " + e.getMessage());
                }
            }
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }


    }

    private void loadUsers() {
        try {
            ListUsersPage page = FirebaseAuth.getInstance().listUsers(null);
            while (page != null) {
                for (ExportedUserRecord user : page.getValues()) {
                    String userId = user.getUid();
                    Optional<User> userOptional = userRepository.findById(userId);
                    if (!userOptional.isPresent()) {
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
