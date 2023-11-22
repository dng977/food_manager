package com.dng.foodmanager.converters;

import com.dng.foodmanager.domain.Receipt;
import com.dng.foodmanager.domain.ReceiptItem;
import com.dng.foodmanager.domain.ReceiptItemStatus;
import lombok.NoArgsConstructor;
import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.springframework.core.convert.converter.Converter;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Component
@NoArgsConstructor
public class ImageToReceipt implements Converter<byte[], Receipt> {


    @Override
    public Receipt convert(byte[] source) {
        Receipt receipt = new Receipt();
        ArrayList<String> foodValues = imageToText(source);
        String storeName = foodValues.get(0);
        foodValues.remove(0);
        List<ReceiptItem> receiptItemList = createReceiptItemsList(foodValues, receipt);
        receipt.setStoreName(storeName.isEmpty() ? "<unknown>" : storeName);
        receipt.setDate(Instant.now());
        receipt.setReceiptItems(receiptItemList);
        return receipt;
    }

    public ArrayList<String> imageToText(byte[] imageBytes) {
        //byte[] bytes = ArrayUtils.toPrimitive(image);
        try {
            Tesseract tesseract = new Tesseract();
            tesseract.setDatapath(new ClassPathResource( "data/tesseract/").getFile().getPath());
            tesseract.setLanguage("eng");
            //tesseract.setOcrEngineMode();
            BufferedImage bufferedImage = createImageFromBytes(imageBytes);
            String text = tesseract.doOCR(bufferedImage);
            System.out.println(text);
            Files.writeString(new ClassPathResource("static/py/tesseract-text.txt").getFile().toPath(),text);
            return pythonSpellingFilter();
        } catch (TesseractException | FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
    public ArrayList<String> imageToText(BufferedImage bi) {
        //byte[] bytes = ArrayUtils.toPrimitive(image);
        try {
            Tesseract tesseract = new Tesseract();
            tesseract.setDatapath("src\\main\\resources\\data");
            tesseract.setLanguage("eng");
            //tesseract.setOcrEngineMode();
            String text = tesseract.doOCR(bi);
            System.out.println(text);
            Files.writeString(Path.of( "src/main/resources/static/py/tesseract-text.txt"),text);
            return pythonSpellingFilter();
        } catch (TesseractException | FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    private List<ReceiptItem> createReceiptItemsList(ArrayList<String> foodValues, Receipt receipt){
        List<ReceiptItem> receiptItemList = new ArrayList<>();
        for(String foodValue: foodValues){
            ReceiptItem item = new ReceiptItem(foodValue,receipt, null, ReceiptItemStatus.UNRECOGNIZED);
            receiptItemList.add(item);
        }
        return receiptItemList;
    }

    private ArrayList<String> pythonSpellingFilter() throws IOException {
        //Process p = Runtime.getRuntime().exec("python yourapp.py");
        ProcessBuilder processBuilder = new ProcessBuilder("python3",new ClassPathResource("static/py/spell_checker.py").getFile().getPath());
        processBuilder.redirectErrorStream(true);
        Process p = processBuilder.start();
        BufferedReader stdInput = new BufferedReader(new
                InputStreamReader(p.getInputStream()));

        BufferedReader stdError = new BufferedReader(new
                InputStreamReader(p.getErrorStream()));

        ArrayList<String> food_values = new ArrayList<>();
        String s = null;
        // read the output from the command
        while ((s = stdInput.readLine()) != null) {
            food_values.add(s);
        }
        return food_values;
    }


    private BufferedImage createImageFromBytes(byte[] imageData) {
        ByteArrayInputStream bais = new ByteArrayInputStream(imageData);
        try {
            return ImageIO.read(bais);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
