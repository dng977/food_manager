package com.dng.foodmanager.services;

import com.dng.foodmanager.converters.ImageToReceipt;
import com.dng.foodmanager.domain.Receipt;
import com.dng.foodmanager.domain.ReceiptItem;
import com.dng.foodmanager.repositories.WholeFoodRepository;
import com.dng.foodmanager.repositories.FoodStockRepository;
import com.dng.foodmanager.repositories.ReceiptItemRepository;
import com.dng.foodmanager.repositories.ReceiptRepository;

import com.dng.foodmanager.util.DtoConverter;
import org.apache.commons.io.FileUtils;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ReceiptServiceImplTest {

    ReceiptService receiptService;

    @Mock
    ReceiptRepository receiptRepository;

    @Mock
    ReceiptItemRepository receiptItemRepository;

    @Mock
    ImageToReceipt imageToReceipt;

    @Mock
    WholeFoodRepository wholeFoodRepository;

    @Mock
    FoodStockRepository foodStockRepository;
    @Mock
    DtoConverter dtoConverter;
    @Mock
    FileStorageService fileStorageService;
    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        receiptService = new ReceiptServiceImpl(receiptRepository, imageToReceipt, receiptItemRepository, wholeFoodRepository,foodStockRepository, dtoConverter,fileStorageService);
    }

    @Test
    void uploadReceipt() throws IOException {
        //given
        MultipartFile multipartFile = new MockMultipartFile("imagefile","testing.txt","text/plain",
                "Food Manager".getBytes());

        ArgumentCaptor<Receipt> argumentCaptor = ArgumentCaptor.forClass(Receipt.class);

        //when
        receiptService.uploadReceipt("user",multipartFile);

        //then
        verify(receiptRepository,times(1)).save(argumentCaptor.capture());// the argument captor captures the
        // argument of the repository call, i.e. the receipt
        Receipt savedReceipt = argumentCaptor.getValue();
        //assertEquals(multipartFile.getBytes().length,savedReceipt.getImage().length);
    }


    @Test
    void getReceipts() {
    }

    @Test
    void findById() throws IOException {
        Long testId = 1L;
        Receipt receipt = new Receipt();
        receipt.setId(testId);
        Optional<Receipt> receiptOptional = Optional.of(receipt);

        when(receiptRepository.findById(anyLong())).thenReturn(receiptOptional);

        Assertions.assertNotNull(receiptService.getReceipt("asd",testId),"Receipt is null");
        verify(receiptRepository, times(1)).findById(anyLong());
        verify(receiptRepository, never()).findAll();
    }

    @Test
    void getReceiptItemsById() {
        Long testId = 1L;
        List<ReceiptItem> receiptItemSet = List.of(new ReceiptItem());
        Receipt receipt = Receipt.builder().id(testId).build();
        receipt.setReceiptItems(receiptItemSet);
        Optional<Receipt> receiptOptional = Optional.of(receipt);

        when(receiptRepository.findById(anyLong())).thenReturn(receiptOptional);

        assertEquals(1,receiptService.getReceiptItemsById("asda",testId).size());
    }

    @Test
    void saveImageTest() throws IOException {
        File imagefile = new File("src\\main\\resources\\data\\receiptimages\\" + "image1");

        try(FileOutputStream s = FileUtils.openOutputStream(imagefile)) {
            s.write("Test image".getBytes());
            System.out.println("TEST");
        } catch (IOException e) {
            throw e;
        }
    }
}