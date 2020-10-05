package com.dng.foodmanager.receiptservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;

//@EnableDiscoveryClient
@SpringBootApplication
public class ReceiptServiceApp {

	public static void main(String[] args) {
		SpringApplication.run(ReceiptServiceApp.class, args);
	}



}
