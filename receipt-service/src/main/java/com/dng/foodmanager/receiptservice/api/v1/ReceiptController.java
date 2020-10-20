package com.dng.foodmanager.receiptservice.api.v1;

import com.dng.foodmanager.receiptservice.dto.ReceiptDto;
import com.dng.foodmanager.receiptservice.config.security.CustomPrincipal;
import com.dng.foodmanager.receiptservice.dto.ReceiptItemDto;
import com.dng.foodmanager.receiptservice.services.ReceiptService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Slf4j
@RestController
//@CrossOrigin(value= {"http://localhost:3000"})
@RequestMapping(path = ReceiptController.BASE_URL, produces = MediaType.APPLICATION_JSON_VALUE)
public class ReceiptController {

    public static final String BASE_URL = "/api/v1/receipts";

    private final ReceiptService receiptService;

    public ReceiptController(ReceiptService receiptService) {
        this.receiptService = receiptService;
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<ReceiptDto> getReceipts(@AuthenticationPrincipal CustomPrincipal principal) {
        log.debug(BASE_URL + " GET mapping triggered");
        return receiptService.getReceipts(principal.getUid());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public List<ReceiptDto> uploadReceiptImage(@RequestBody MultipartFile file, @AuthenticationPrincipal CustomPrincipal principal)
            throws IOException {
        log.debug(BASE_URL + " POST mapping triggered");

        receiptService.uploadReceipt(principal.getUid(), file);
        return receiptService.getReceipts(principal.getUid());

    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ReceiptDto getReceiptById(@AuthenticationPrincipal CustomPrincipal principal, @PathVariable String id) throws NumberFormatException, IOException {
        log.debug(BASE_URL + "/{id}" + " GET mapping triggered");

        return receiptService.getReceipt(principal.getUid(), Long.valueOf(id));
    }
    @GetMapping("/{id}/items")
    @ResponseStatus(HttpStatus.OK)
    public List<ReceiptItemDto> getReceiptItems(@AuthenticationPrincipal CustomPrincipal principal, @PathVariable String id) throws NumberFormatException, IOException {
        log.debug(BASE_URL + "/{id}/items" + " GET mapping triggered");

        return receiptService.getReceiptItemsById(principal.getUid(), Long.valueOf(id));
    }

    @GetMapping(
        value = "/{id}/image",
        produces = MediaType.IMAGE_JPEG_VALUE
    )
    public @ResponseBody byte[] getReceiptImage(@AuthenticationPrincipal CustomPrincipal principal, @PathVariable String id) throws NumberFormatException, IOException {
        log.debug(BASE_URL + "/{id}/image" + " GET mapping triggered");

        return receiptService.getReceiptImage(principal.getUid(), Long.valueOf(id));
    }



    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public List<ReceiptItemDto> editReceiptItems(@AuthenticationPrincipal CustomPrincipal principal, @RequestBody List<ReceiptItemDto> receiptItemDtoList, @PathVariable String id) throws NumberFormatException, IOException {
        log.debug(BASE_URL + "/{id}" + " GET mapping triggered");

        return receiptService.editReceiptItems(principal.getUid(), Long.valueOf(id), receiptItemDtoList);
    }

    @PutMapping("/{rid}/items/{iid}")
    @ResponseStatus(HttpStatus.OK)
    public void editReceiptItem(@AuthenticationPrincipal CustomPrincipal principal, @RequestBody ReceiptItemDto receiptItemDto, @PathVariable String rid, @PathVariable String iid) throws NumberFormatException, IOException {
        log.debug(BASE_URL + "/" + rid + "/items/" + iid + " PUT mapping triggered");

        receiptService.editReceiptItem(principal.getUid(), Long.valueOf(rid),Long.valueOf(iid), receiptItemDto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public List<ReceiptDto> deleteReceipt(@AuthenticationPrincipal CustomPrincipal principal, @PathVariable String id) throws NumberFormatException, IOException {
        log.debug(BASE_URL + "/" + id + " DELETE mapping triggered");

        return receiptService.deleteReceipt(principal.getUid(), Long.valueOf(id));
    }

    public static CustomPrincipal getToken() {
        return (CustomPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    @GetMapping("/foodstock/{receiptId}")
    @ResponseStatus(HttpStatus.OK)
    public List<ReceiptItemDto> addReceiptToFoodStock(@AuthenticationPrincipal CustomPrincipal principal, @PathVariable String receiptId){
        log.debug(BASE_URL + "/foodstock" + receiptId + " GET mapping triggered");

        return receiptService.addReceiptToFoodStock(principal.getUid(), Long.valueOf(receiptId));
    }

//    @RequestMapping(value = "/{id}/image", method = RequestMethod.GET)
//    public void getReceiptImage(HttpServletResponse response) throws IOException {
//        InputStream in = servletContext.getResourceAsStream("/WEB-INF/images/image-example.jpg");
//        response.setContentType(MediaType.IMAGE_JPEG_VALUE);
//        IOUtils.copy(in, response.getOutputStream());
//    }
}
