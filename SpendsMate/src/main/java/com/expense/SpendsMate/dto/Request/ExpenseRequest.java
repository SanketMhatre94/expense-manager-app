package com.expense.SpendsMate.dto.Request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class ExpenseRequest {
    @NotNull(message = "date should not be null")
    private LocalDate date;
    @NotNull(message = "amount should not be null")
    @Positive(message = "amount can't be negative")
    private BigDecimal amount;
    @NotBlank(message = "Vendor sould not be blank")
    private String vendor;
    private String description;
}