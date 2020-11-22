package com.dng.foodmanager.receiptservice.services;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

import com.dng.foodmanager.receiptservice.converters.ImageToReceipt;
import com.dng.foodmanager.receiptservice.domain.*;
import com.dng.foodmanager.receiptservice.dto.ReceiptDto;
import com.dng.foodmanager.receiptservice.dto.ReceiptItemDto;
import com.dng.foodmanager.receiptservice.repositories.FoodItemRepository;
import com.dng.foodmanager.receiptservice.repositories.FoodStockRepository;
import com.dng.foodmanager.receiptservice.repositories.ReceiptItemRepository;
import com.dng.foodmanager.receiptservice.repositories.ReceiptRepository;

import com.dng.foodmanager.receiptservice.services.exceptions.ResourceNotFoundException;
import com.dng.foodmanager.receiptservice.util.DtoConverter;
import com.google.cloud.storage.*;
import com.google.firebase.cloud.StorageClient;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FileUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;

@SuppressWarnings("unused")
@Slf4j
@Service
@RequiredArgsConstructor
public class ReceiptServiceImpl implements ReceiptService {
    private final ReceiptRepository receiptRepository;
    private final ImageToReceipt imageToReceipt;
    private final ReceiptItemRepository receiptItemRepository;
    private final FoodItemRepository foodItemRepository;
    private final FoodStockRepository foodStockRepository;

    private final DtoConverter dtoConverter;

    @Autowired
    private ModelMapper modelMapper;

    @Nullable
    @Override
    @Transactional
    public void uploadReceipt(String username, MultipartFile receiptImage) throws IOException {
        //Create new receipt
        byte[] imageBytes = receiptImage.getBytes();
        Receipt receipt = imageToReceipt.convert(imageBytes);
        receipt.setUserId(username);
        receipt.setConfirmed(true);
        receipt.setReceiptItems(receipt.getReceiptItems().stream().map(receiptItem -> {
            List<FoodItem> foodItems = getFoodItems(receiptItem);
            receiptItem.setRecognizedFoods(foodItems);
            receiptItem.setStatus(foodItems.size() == 0 ? ReceiptItemStatus.UNRECOGNIZED
                    : foodItems.size() == 1 ? ReceiptItemStatus.RECOGNIZED
                    : ReceiptItemStatus.UNSURE
            );
            return receiptItem;
        }).collect(Collectors.toList()));
        //Save to db so that it gets an ID
        receipt = receiptRepository.save(receipt);
        //saveImageToFile(receiptImage,username, receipt.getId());

        String fileName = "receipt-" + username + "-" + receipt.getId() + ".jpg";

        uploadImageToBucket(imageBytes, fileName);


    }

    @Override
    public List<ReceiptDto> getReceipts(String userId) {
        List<ReceiptDto> receiptSet = new ArrayList<>();
        receiptRepository.findByUserId(userId).iterator().forEachRemaining((receipt -> receiptSet.add(dtoConverter.convertToDto(receipt, false))));
        return receiptSet;
    }

    @Nullable
    @Override
    public ReceiptDto getReceipt(String userId, Long id) throws IOException {

        Optional<Receipt> receiptOptional = receiptRepository.findById(id);

        if (!receiptOptional.isPresent()) {
            throw new ResourceNotFoundException("Receipt Not Found!");
        }

        Receipt receipt = receiptOptional.get();
        //receipt.setImage(readImageFromFile(receipt.getId()));
        return dtoConverter.convertToDto(receipt, true);
    }


    @Override
    public List<ReceiptItemDto> getReceiptItemsById(String userId, Long id) {
        List<ReceiptItem> receiptItems = receiptItemRepository.findByReceipt(id);
        if (receiptItems.isEmpty())
            throw new ResourceNotFoundException("There is no such receipt");
        //TODO - ? Perhpas use receiptRepository instead
        return receiptItems.stream().map(dtoConverter::convertToDto).collect(Collectors.toList());
    }

    @Override
    public byte[] getReceiptImage(String username, Long id) throws IOException {
        String filePath = "receipts/receipt-" + username + "-" + id + ".jpg";

        Bucket bucket = StorageClient.getInstance().bucket();

        Blob receiptImage = bucket.get(filePath);
        if (receiptImage == null) {
            throw new StorageException(404, "There isn't such receipt id that corresponds to the requesting user.");
        }
        return Base64.getEncoder().encode(receiptImage.getContent());
    }

    @Override
    public List<ReceiptItemDto> editReceiptItems(String userId, Long id, List<ReceiptItemDto> receiptItemDtoList) {
        return null;
    }

    @Override
    public void editReceiptItem(String userId, Long rid, Long iid, ReceiptItemDto receiptItemDto) {
        Optional<ReceiptItem> receiptItemOpt = receiptItemRepository.findById(iid);
        Optional<FoodItem> newFoodItemOpt = foodItemRepository.findById(receiptItemDto.getFoodItemReceiptDto().get(0).getId());
        if (!newFoodItemOpt.isPresent() || !receiptItemOpt.isPresent()) {
            throw new RuntimeException("FoodItem id wrong.");
        }
        ReceiptItem receiptItem = receiptItemOpt.get();
        FoodItem newFoodItem = newFoodItemOpt.get();
        receiptItem.setRecognizedFoods(new ArrayList<>(Arrays.asList(newFoodItem)));
        receiptItem.setStatus(ReceiptItemStatus.RECOGNIZED);

        receiptItemRepository.save(receiptItem);

    }


    @Transactional
    @Override
    public List<ReceiptDto> deleteReceipt(String userId, Long id) {
        String filePath = "receipts/receipt-" + userId + "-" + id + ".jpg";

        Bucket bucket = StorageClient.getInstance().bucket();
        Blob receiptImage = bucket.get(filePath);
        try {
            //Long firstItemId = receiptItemRepository.findFirstIdByReceipt(id);
            receiptRepository.deleteById(id);
            receiptRepository.resetIdSeed();
            receiptItemRepository.resetIdSeed();
            log.debug("GOING TO EXECUTE DELETEIMAGE");
            receiptImage.delete();
        } catch (NullPointerException e) {
            throw new StorageException(404, "There isn't such receipt id that corresponds to the requesting user.");
        }


        return getReceipts(userId);
    }

    @Transactional
    @Override
    public List<ReceiptItemDto> addReceiptToFoodStock(String userId, Long receiptId) {
        List<FoodStock> foodStockList = new ArrayList<>();
        List<ReceiptItem> foodItemList = receiptItemRepository.findByReceipt(receiptId);
        for (ReceiptItem receiptItem : foodItemList) {
            if (receiptItem.getStatus().equals(ReceiptItemStatus.RECOGNIZED)) {
                FoodItem newFoodItem = receiptItem.getRecognizedFoods().get(0);
                Optional<FoodStock> foodItemInStockOpt = foodStockRepository.findByUserIdAndFoodItemId(userId, newFoodItem.getId());
                if (foodItemInStockOpt.isPresent()) {
                    FoodStock foodItemInStock = foodItemInStockOpt.get();
                    Integer oldQuantity = foodItemInStock.getQuantity();
                    //TODO - Implement Quantity (maybe)
                    Integer newQuantity = newFoodItem.getDefaultQuantity();
                    if (oldQuantity != null) {
                        foodItemInStock.setQuantity(oldQuantity + newQuantity);
                    }
                } else {
                    foodStockRepository.save(new FoodStock(userId, newFoodItem, newFoodItem.getDefaultQuantity()));
                }

                receiptItem.setStatus(ReceiptItemStatus.INSTOCK);

            }
        }
        return foodItemList.stream().map(dtoConverter::convertToDto).collect(Collectors.toList());
    }


    private void uploadImageToBucket(byte[] imageBytes, String fileName) throws IOException, StorageException {
        log.debug("Uploading receipt: " + fileName);

        String folder = "receipts/";
        String filePath = folder + fileName;

        Bucket bucket = StorageClient.getInstance().bucket();
        Blob blob = bucket.create(filePath, imageBytes, "receipt");
    }

    private void saveImageToFile(byte[] imageBytes, String username, Long imageId) throws IOException {
        String fileName = "receipt" + imageId + ".jpg";
        File imagefile = new File("src\\main\\resources\\data\\receiptimages\\" + fileName);

        FileOutputStream s = FileUtils.openOutputStream(imagefile);
        s.write(imageBytes);
        s.close();
    }

    private byte[] readImageFromFile(Long imageId) throws IOException {
        String fileName = "receipt" + imageId + ".jpg";
        File imagefile = new File("src\\main\\resources\\data\\receiptimages\\" + fileName);

        FileInputStream inputStream = FileUtils.openInputStream(imagefile);
        byte[] imageBytes = inputStream.readAllBytes();
        inputStream.close();

        return imageBytes;
        //return ArrayUtils.toObject(imageBytes);
    }


    private List<FoodItem> getFoodItems(ReceiptItem receiptItem) {
        String referenceItemName = receiptItem.getReferenceName().toLowerCase();
        List<FoodItem> candidateFoodItems = new ArrayList<>();
        foodItemRepository.findAll().forEach(foodItem -> {

            //1) Check if foodItem's name is contained in the itemReference
            boolean candidateInFoodItemName = false;
            for (String foodItemWord : foodItem.getName().toLowerCase().strip().split(" ")) {
                if (referenceItemName.contains(foodItemWord)) {
                    candidateFoodItems.add(foodItem);
                    candidateInFoodItemName = true;
                    break;
                }
            }
            if (!candidateInFoodItemName) {
                //2) Check foodItems's reference words Dictionary
                foodItem.getReferenceWords().stream().forEach(foodReference -> {
                    if (foodReference.getReferenceWord().toLowerCase().contains(referenceItemName)) {
                        candidateFoodItems.add(foodItem);
                    }
                });
            }

        });
        return candidateFoodItems;
    }


}
