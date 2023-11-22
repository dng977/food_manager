package com.dng.foodmanager.services;

import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.StorageException;
import com.google.firebase.cloud.StorageClient;
import org.springframework.stereotype.Service;

import java.util.Base64;

@Service
public class FirebaseStorage implements FileStorageService {
    @Override
    public void storeFile(byte[] imageBytes, String filePath) {
        Bucket bucket = StorageClient.getInstance().bucket();
        Blob blob = bucket.create(filePath, imageBytes, "receipt");
    }

    @Override
    public byte[] loadBytesFile(String filePath, boolean base64Encode) {
        Bucket bucket = StorageClient.getInstance().bucket();

        Blob file = bucket.get(filePath);
        if (file == null) {
            throw new StorageException(404, "File can't be loaded.");
        }
        return base64Encode ? Base64.getEncoder().encode(file.getContent()) : file.getContent();
    }

    @Override
    public boolean deleteFile(String filePath) {
        if(filePath != null) {
            Bucket bucket = StorageClient.getInstance().bucket();
            Blob file = bucket.get(filePath);
            try {
                return file.delete();
            } catch (NullPointerException e) {
                throw new StorageException(404, "File can't be deleted.");
            }
        }
        return true;
    }

}
