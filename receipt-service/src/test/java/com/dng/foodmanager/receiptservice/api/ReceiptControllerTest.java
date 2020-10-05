package com.dng.foodmanager.receiptservice.api;

import com.dng.foodmanager.receiptservice.api.v1.ReceiptController;
import com.dng.foodmanager.receiptservice.services.ReceiptService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class ReceiptControllerTest {

    private MockMvc mockMvc;

    @Mock
    private ReceiptService receiptService;

    ReceiptController receiptController;


    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        receiptController = new ReceiptController(receiptService);
        mockMvc = MockMvcBuilders.standaloneSetup(receiptController).build();
    }

    @Test
    void uploadReceiptImage() throws Exception {

        MockMultipartFile multipartFile = new MockMultipartFile(
                "file","test.txt", "text/plain", "Spring Framework".getBytes());

        this.mockMvc.perform(multipart("/receipts").file(multipartFile)).andExpect(status().isFound())
                .andExpect(header().string("Location", "/receipts"));

        verify(receiptService,times(1)).uploadReceipt("User",ArgumentMatchers.any());

    }
}