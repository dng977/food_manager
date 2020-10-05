package com.dng.foodmanager.receiptservice.config.security;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class CustomPrincipal {
    private String uid;
}