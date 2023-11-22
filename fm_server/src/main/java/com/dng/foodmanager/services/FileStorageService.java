package com.dng.foodmanager.services;

public interface FileStorageService {
    enum ObjectType{
        RECEIPT("receipts/receipt"),
        MEAL("meals/meal");
        private String path;
        ObjectType(String path){
            this.path = path;
        }
        public String getPath() {
            return path;
        }
    }

    void storeFile(byte[] imageBytes, String filePath);
    byte[] loadBytesFile(String filePath, boolean base64Encode);

    boolean deleteFile(String filePath);
    default String createFilePathName(ObjectType objectType, String userId, long objectId){
        return objectType.getPath() + "-" + userId + "-" + objectId + ".jpg";
    }
}


