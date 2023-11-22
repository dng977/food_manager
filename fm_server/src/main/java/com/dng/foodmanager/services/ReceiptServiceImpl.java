package com.dng.foodmanager.services;

import com.dng.foodmanager.converters.ImageToReceipt;
import com.dng.foodmanager.domain.*;
import com.dng.foodmanager.dto.receipt_dtos.ReceiptDto;
import com.dng.foodmanager.dto.receipt_dtos.ReceiptItemDto;
import com.dng.foodmanager.repositories.FoodStockRepository;
import com.dng.foodmanager.repositories.ReceiptItemRepository;
import com.dng.foodmanager.repositories.ReceiptRepository;
import com.dng.foodmanager.repositories.WholeFoodRepository;
import com.dng.foodmanager.services.exceptions.ResourceNotFoundException;
import com.dng.foodmanager.util.DtoConverter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Slf4j
@Service
@RequiredArgsConstructor
public class ReceiptServiceImpl implements ReceiptService {
    private final ReceiptRepository receiptRepository;
    private final ImageToReceipt imageToReceipt;
    private final ReceiptItemRepository receiptItemRepository;
    private final WholeFoodRepository wholeFoodRepository;
    private final FoodStockRepository foodStockRepository;
    private final DtoConverter dtoConverter;

    private final FileStorageService fileStorageService;


    @Override
    @Transactional
    public void uploadReceipt(String username, MultipartFile receiptImage) throws IOException {
        //Create new receipt
        byte[] imageBytes = receiptImage.getBytes();
        Receipt receipt = imageToReceipt.convert(imageBytes);
        receipt.setUserId(username);
        receipt.setConfirmed(true);
        receipt.setReceiptItems(receipt.getReceiptItems().stream().map(receiptItem -> {
            List<WholeFood> wholeFoods = getFoodItems(receiptItem);
            receiptItem.setRecognizedFoods(wholeFoods);
            receiptItem.setStatus(wholeFoods.size() == 0 ? ReceiptItemStatus.UNRECOGNIZED
                    : wholeFoods.size() == 1 ? ReceiptItemStatus.RECOGNIZED
                    : ReceiptItemStatus.UNSURE
            );
            return receiptItem;
        }).collect(Collectors.toList()));
        //Save to db so that it gets an ID
        receipt = receiptRepository.save(receipt);
        //saveImageToFile(receiptImage,username, receipt.getId());

        String filePath = fileStorageService.createFilePathName(FileStorageService.ObjectType.RECEIPT,username,receipt.getId());
        fileStorageService.storeFile(imageBytes, filePath);

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
        String filePath = fileStorageService.createFilePathName(FileStorageService.ObjectType.RECEIPT,username,id);

        return  fileStorageService.loadBytesFile(filePath, true);
    }

    @Override
    public List<ReceiptItemDto> editReceiptItems(String userId, Long id, List<ReceiptItemDto> receiptItemDtoList) {
        return null;
    }

    @Override
    public void editReceiptItem(String userId, Long rid, Long iid, ReceiptItemDto receiptItemDto) {
        Optional<ReceiptItem> receiptItemOpt = receiptItemRepository.findById(iid);
        Optional<WholeFood> newFoodItemOpt = wholeFoodRepository.findById(receiptItemDto.getWholeFoodDtoList().get(0).getId());
        if (!newFoodItemOpt.isPresent() || !receiptItemOpt.isPresent()) {
            throw new RuntimeException("FoodItem id wrong.");
        }
        ReceiptItem receiptItem = receiptItemOpt.get();
        WholeFood newWholeFood = newFoodItemOpt.get();
        receiptItem.setRecognizedFoods(new ArrayList<>(Arrays.asList(newWholeFood)));
        receiptItem.setStatus(ReceiptItemStatus.RECOGNIZED);

        receiptItemRepository.save(receiptItem);

    }


    @Transactional
    @Override
    public List<ReceiptDto> deleteReceipt(String userId, Long id) {
        String filePath = fileStorageService.createFilePathName(FileStorageService.ObjectType.RECEIPT,userId,id);

            //Long firstItemId = receiptItemRepository.findFirstIdByReceipt(id);
        receiptRepository.deleteById(id);
        receiptRepository.resetIdSeed();
        receiptItemRepository.resetIdSeed();
        log.debug("GOING TO EXECUTE DELETEIMAGE");
        fileStorageService.deleteFile(filePath);



        return getReceipts(userId);
    }

    @Transactional
    @Override
    public List<ReceiptItemDto> addReceiptToFoodStock(String userId, Long receiptId) {
        List<FoodStock> foodStockList = new ArrayList<>();
        List<ReceiptItem> foodItemList = receiptItemRepository.findByReceipt(receiptId);
        for (ReceiptItem receiptItem : foodItemList) {
            if (receiptItem.getStatus().equals(ReceiptItemStatus.RECOGNIZED)) {
                WholeFood newWholeFood = receiptItem.getRecognizedFoods().get(0);
                Optional<FoodStock> foodItemInStockOpt = foodStockRepository.findByUserIdAndFoodItemId(userId, newWholeFood.getId());
                if (foodItemInStockOpt.isPresent()) {
                    FoodStock foodItemInStock = foodItemInStockOpt.get();
                    Float oldQuantity = foodItemInStock.getQuantity();
                    //TODO - Implement Quantity (maybe)
                    Float newQuantity = newWholeFood.getDefaultQuantity();
                    if (oldQuantity != null) {
                        foodItemInStock.setQuantity(oldQuantity + newQuantity);
                    }
                } else {
                    foodStockRepository.save(new FoodStock(userId, newWholeFood, newWholeFood.getDefaultQuantity()));
                }

                receiptItem.setStatus(ReceiptItemStatus.INSTOCK);

            }
        }
        return foodItemList.stream().map(dtoConverter::convertToDto).collect(Collectors.toList());
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


    private List<WholeFood> getFoodItems(ReceiptItem receiptItem) {
        String referenceItemName = receiptItem.getReferenceName().toLowerCase();
        List<WholeFood> candidateWholeFoods = new ArrayList<>();
        wholeFoodRepository.findAll().forEach(foodItem -> {

            //1) Check if foodItem's name is contained in the itemReference
            boolean candidateInFoodItemName = false;
            for (String foodItemWord : foodItem.getName().toLowerCase().strip().split(" ")) {
                if (referenceItemName.contains(foodItemWord)) {
                    candidateWholeFoods.add(foodItem);
                    candidateInFoodItemName = true;
                    break;
                }
            }
            if (!candidateInFoodItemName) {
                //2) Check foodItems's reference words Dictionary
                foodItem.getReferenceWords().stream().forEach(foodReference -> {
                    if (foodReference.getReferenceWord().toLowerCase().contains(referenceItemName)) {
                        candidateWholeFoods.add(foodItem);
                    }
                });
            }

        });
        return candidateWholeFoods;
    }


}
