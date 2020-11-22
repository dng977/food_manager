package com.dng.foodmanager.receiptservice.bootstrap;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
@ConfigurationProperties
@Getter
@Setter
public class DataConfigProperties {

    private List<Map<String, String>> data;
}
