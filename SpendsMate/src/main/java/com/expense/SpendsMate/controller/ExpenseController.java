package com.expense.SpendsMate.controller;

import com.expense.SpendsMate.dto.Request.ExpenseRequest;
import com.expense.SpendsMate.dto.Response.ApiResponse;
import com.expense.SpendsMate.dto.Response.CsvUploadResult;
import com.expense.SpendsMate.dto.Response.ExpenseResponse;
import com.expense.SpendsMate.service.ExpenseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

// controller/ExpenseController.java
@RestController
@RequestMapping("/api/expenses")
@RequiredArgsConstructor
public class ExpenseController {

    private final ExpenseService expenseService;

    @PostMapping
    public ResponseEntity<ApiResponse<ExpenseResponse>> addExpense(
            @RequestBody @Valid ExpenseRequest req) {

        ExpenseResponse expense = expenseService.addExpense(req);
        String message = expense.isAnomaly()
                ? "Expense saved — anomaly detected for category: " + expense.getCategory()
                : "Expense saved successfully";

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.created(message, expense));
    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<CsvUploadResult>> uploadCsv(
            @RequestParam("file") MultipartFile file) {

        if (file.isEmpty()) {
            return ResponseEntity
                    .badRequest()
                    .body(ApiResponse.error(400, "Uploaded file is empty"));
        }

        CsvUploadResult result = expenseService.uploadCsv(file);
        String message = String.format("CSV processed — %d saved, %d skipped",
                result.getSaved(), result.getSkipped());

        return ResponseEntity.ok(ApiResponse.ok(message, result));
    }
}