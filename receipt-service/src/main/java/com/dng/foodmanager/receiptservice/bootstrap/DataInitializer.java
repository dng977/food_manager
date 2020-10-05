package com.dng.foodmanager.receiptservice.bootstrap;

import com.dng.foodmanager.receiptservice.domain.Receipt;
import com.dng.foodmanager.receiptservice.repositories.ReceiptRepository;
import com.dng.foodmanager.receiptservice.services.ReceiptService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.beans.factory.SmartInitializingSingleton;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Component;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.util.Arrays;

@Slf4j
@Component
public class DataInitializer implements SmartInitializingSingleton {

    private final ReceiptRepository receiptRepository;

    private final ReceiptService receiptService;

    public DataInitializer(ReceiptRepository receiptRepository, ReceiptService receiptService) {
        this.receiptRepository = receiptRepository;
        this.receiptService = receiptService;
    }



    @Override
    public void afterSingletonsInstantiated() {
/*        //Store aldi = Store.builder().name("Aldi").build();
        Path imagePath;
        try {
            FileUtils.cleanDirectory(new File("src\\main\\resources\\data\\receiptimages"));
            imagePath = ResourceUtils.getFile("classpath:static/images/image1.jpg").toPath();
            //Byte[] byteArray = ArrayUtils.toObject(Files.readAllBytes(imagePath));
            MultipartFile multipartFile = new MockMultipartFile("test-image", new FileInputStream(imagePath.toFile()));
            receiptService.uploadReceipt("TESTUSER", multipartFile);
//            Byte[] byteArray = ArrayUtils.toObject("Byte array".getBytes());
//            receiptRepository.saveAll(Arrays.asList(
//                    Receipt.builder().date(LocalDate.now()).image(byteArray).build()
//            ));
            log.info("Receipts Data loaded successfully");

        } catch (IOException e) {
            e.printStackTrace();
        // User dimitar = new User("Dimitar", this.passwordEncoder.encode("dimitar"));
        // dimitar.addAuthority("READ");
        // dimitar.addAuthority("WRITE");

        // userRepository.save(dimitar);
        }*/


    }
}
