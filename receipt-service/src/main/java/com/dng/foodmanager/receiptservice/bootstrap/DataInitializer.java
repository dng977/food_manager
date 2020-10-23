package com.dng.foodmanager.receiptservice.bootstrap;

import com.dng.foodmanager.receiptservice.domain.Receipt;
import com.dng.foodmanager.receiptservice.repositories.ReceiptRepository;
import com.dng.foodmanager.receiptservice.services.ReceiptService;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.storage.Bucket;
import com.google.firebase.FirebaseApp;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.ListUsersPage;
import com.google.firebase.cloud.FirestoreClient;
import com.google.firebase.cloud.StorageClient;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.beans.factory.SmartInitializingSingleton;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Component;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
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



    @Override
    public void afterSingletonsInstantiated() {
        log.debug("afterSingletonsInstantiated !! ---");
    }
}
