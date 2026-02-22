package com.expense.SpendsMate.dto.Response;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

// dto/ExpenseResponse.java
@Data
@Builder
public class ExpenseResponse {
    private Long id;
    private LocalDate date;
    private BigDecimal amount;
    private String vendor;
    private String description;
    private String category;
    private boolean isAnomaly;
}