package com.expense.SpendsMate.service;

import com.expense.SpendsMate.dto.Request.ExpenseRequest;
import com.expense.SpendsMate.dto.Response.CsvUploadResult;
import com.expense.SpendsMate.dto.Response.ExpenseResponse;
import com.expense.SpendsMate.entity.Category;
import com.expense.SpendsMate.entity.Expense;
import com.expense.SpendsMate.repository.ExpenseRepository;
import com.opencsv.CSVReader;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

// service/ExpenseService.java
@Service
@RequiredArgsConstructor
@Transactional
public class ExpenseService {

    private final ExpenseRepository      expenseRepository;
    private final CategorizationService  categorizationService;
    private final AnomalyService         anomalyService;

    public ExpenseResponse addExpense(ExpenseRequest req) {
        Expense expense = buildExpense(req.getDate(), req.getAmount(), req.getVendor(), req.getDescription());
        expenseRepository.save(expense);
        return toResponse(expense);
    }

    public CsvUploadResult uploadCsv(MultipartFile file) {
        List<String> errors = new ArrayList<>();
        int saved = 0, skipped = 0;

        try (CSVReader reader = new CSVReader(new InputStreamReader(file.getInputStream()))) {
            String[] header = reader.readNext(); // skip header row
            String[] row;
            int lineNum = 1;

            while ((row = reader.readNext()) != null) {
                lineNum++;
                try {
                    Expense expense = parseRow(row);
                    expenseRepository.save(expense);
                    saved++;
                } catch (Exception e) {
                    errors.add("Line " + lineNum + ": " + e.getMessage());
                    skipped++;
                }
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse CSV: " + e.getMessage(), e);
        }

        return CsvUploadResult.builder()
                .saved(saved).skipped(skipped).errors(errors).build();
    }

    // ── private helpers ──────────────────────────────────────────────────────

    private Expense parseRow(String[] row) {
        if (row.length < 4) throw new IllegalArgumentException("Expected 4 columns, got " + row.length);

        LocalDate date        = LocalDate.parse(row[0].trim());
        BigDecimal  amount      = new BigDecimal(row[1].trim());
        String      vendor      = row[2].trim();
        String      description = row[3].trim();

        if (amount.compareTo(BigDecimal.ZERO) <= 0) throw new IllegalArgumentException("Amount must be positive");
        if (vendor.isBlank()) throw new IllegalArgumentException("Vendor is required");

        return buildExpense(date, amount, vendor, description);
    }

    private Expense buildExpense(LocalDate date, BigDecimal amount, String vendor, String description) {
        Category category = categorizationService.categorize(vendor);

        Expense expense = new Expense();
        expense.setDate(date);
        expense.setAmount(amount);
        expense.setVendor(vendor);
        expense.setDescription(description);
        expense.setCategory(category);
        expense.setAnomaly(anomalyService.isAnomaly(expense));
        return expense;
    }

    private ExpenseResponse toResponse(Expense e) {
        return ExpenseResponse.builder()
                .id(e.getId())
                .date(e.getDate())
                .amount(e.getAmount())
                .vendor(e.getVendor())
                .description(e.getDescription())
                .category(e.getCategory().getName())
                .isAnomaly(e.isAnomaly())
                .build();
    }
}