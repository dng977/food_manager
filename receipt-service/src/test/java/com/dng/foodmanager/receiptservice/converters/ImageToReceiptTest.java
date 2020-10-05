package com.dng.foodmanager.receiptservice.image_to_text;

import com.dng.foodmanager.receiptservice.domain.Receipt;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.util.ResourceUtils;

import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;

class ImageToReceiptTest {

    private ImageToReceipt imageToReceipt;

    @BeforeEach
    void setUp() {
        imageToReceipt = new ImageToReceipt();
    }

    @Test
    void convert() throws IOException {
        String receiptFile = "receipt2.jpg";
        Path imagePath =ResourceUtils.getFile("classpath:data/" + receiptFile).toPath();
        byte[] byteArray = Files.readAllBytes(imagePath);
        Receipt receipt = imageToReceipt.convert(byteArray);
        System.out.println(receipt.toString());
    }

    @Test
    void imageToText() throws IOException, URISyntaxException {
        String receiptFile = "receipt1.png";
        Path imagePath =ResourceUtils.getFile("classpath:data/" + receiptFile).toPath();
        byte[] byteArray = Files.readAllBytes(imagePath);

        ArrayList<String> food_values = imageToReceipt.imageToText(byteArray);

        System.out.println(food_values);


    }
}