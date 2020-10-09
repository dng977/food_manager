package com.dng.foodmanager.receiptservice.converters;

import com.dng.foodmanager.receiptservice.domain.Receipt;
import javaxt.io.Image;
import org.apache.commons.io.FileUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.util.ResourceUtils;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
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
        String receiptFile = "receipt6.jpg";

        Image image = new Image(ResourceUtils.getFile("classpath:data/" + receiptFile));
        image.rotate();
        image.setWidth(500);
        image.setOutputQuality(70);
        image.saveAs(new File("src/test/java/com/dng/foodmanager/receiptservice/converters/testImageJXT.jpg"));

        byte[] byteArray = image.getByteArray();
        ArrayList<String> food_values = imageToReceipt.imageToText(image.getBufferedImage());
        for (String element : food_values) {
            System.out.println(element);
        }


    }
}