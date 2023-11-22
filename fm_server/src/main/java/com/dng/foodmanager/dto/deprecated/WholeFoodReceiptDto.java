package com.dng.foodmanager.dto.deprecated;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class WholeFoodReceiptDto {
    private final Long id;
    private final String name;

}
