package com.dng.foodmanager.receiptservice.bootstrap;

import com.google.common.io.Resources;
import com.microsoft.sqlserver.jdbc.SQLServerDriver;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.stereotype.Component;
import org.springframework.util.ResourceUtils;

import javax.sql.DataSource;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.sql.*;

@Slf4j
public class DataInitializer {

    @Value("${spring.datasource.url}")
    private String url;

    @Value("${spring.datasource.username}")
    private String username;

    @Value("${spring.datasource.password}")
    private String password;

    @Value("${nutritionDataPath}")
    private String nutritionDataPath;


    //Run this method when application started
//    @EventListener(ApplicationReadyEvent.class)
    public void getConnection() throws IOException, SQLException {

        //Connect to Database
        String query = Files.readString(ResourceUtils.getFile(nutritionDataPath).toPath());
        DriverManager.registerDriver(new SQLServerDriver());

        try (
                Connection connection = DriverManager.getConnection(url, username, password);
                Statement stmt = connection.createStatement()
        ) {
            int a = stmt.executeUpdate(query);
            log.debug(String.valueOf(a));
        } catch (SQLException e) {
            log.error("Query \n" + query + "\nfailed !");
        }

    }
}
