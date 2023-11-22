package com.dng.foodmanager.api;

import com.dng.foodmanager.services.exceptions.ResourceNotFoundException;
import com.google.cloud.storage.StorageException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.io.IOException;
import java.security.SignatureException;

@RestControllerAdvice
@Slf4j
public class RestResponseEntityExceptionHandler {
    @ExceptionHandler({ResourceNotFoundException.class})
    public ResponseEntity<Object> handleNotFoundException(Exception exception, WebRequest request){
        log.error("Handling ResourceNotFoundException..");
        return new ResponseEntity<Object>("Resource Not Found", new HttpHeaders(), HttpStatus.NOT_FOUND);

    }
    @ExceptionHandler({SignatureException.class})
    public ResponseEntity<Object> handleSignatureException(Exception exception, WebRequest request){
        log.error("Handling SignatureException..");
        return new ResponseEntity<Object>("Bad Signature", new HttpHeaders(), HttpStatus.UNAUTHORIZED);

    }
    @ExceptionHandler({IOException.class})
    public ResponseEntity<Object> handleIOException(IOException exception, WebRequest request){
        log.error("IO problem..");
        return new ResponseEntity<Object>("IO problem: " + exception.getMessage(), new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR);

    }
    @ExceptionHandler({StorageException.class})
    public ResponseEntity<Object> handleStorageException(StorageException exception, WebRequest request){
        log.error("StorageException..");
        return new ResponseEntity<Object>("Storage exception: " + exception.getMessage(), new HttpHeaders(), HttpStatus.NOT_FOUND);

    }
    @ExceptionHandler({NullPointerException.class})
    public ResponseEntity<Object> handleNullPointerException(NullPointerException exception, WebRequest request){
        log.error("NullPointerException..");
        exception.printStackTrace();
        return new ResponseEntity<Object>("Exception: " + exception.getMessage(), new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @ExceptionHandler({IllegalArgumentException.class})
    public ResponseEntity<Object> handleIllegalArgumentException(IllegalArgumentException exception, WebRequest request){
        log.error(exception.getMessage());
        return new ResponseEntity<Object>("Exception: " + exception.getMessage(), new HttpHeaders(), HttpStatus.BAD_REQUEST);

    }
    @ExceptionHandler({Exception.class})
    public ResponseEntity<Object> anyException(Exception exception, WebRequest request){
        log.error("Exception: " + exception.getMessage());
        exception.printStackTrace();
        return new ResponseEntity<Object>("Exception: " + exception.getMessage(), new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR);

    }
}
