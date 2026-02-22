package com.expense.SpendsMate.service;

import com.expense.SpendsMate.entity.Expense;
import com.expense.SpendsMate.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;


// service/AnomalyService.java
@Service
@RequiredArgsConstructor
public class AnomalyService {

    private static final BigDecimal ANOMALY_MULTIPLIER = BigDecimal.valueOf(3);

    private final ExpenseRepository expenseRepository;

    /**
     * An expense is an anomaly if its amount exceeds 3× the category average.
     * If there's no prior data, it cannot be an anomaly (edge case: first expense).
     */
    public boolean isAnomaly(Expense expense) {
        return expenseRepository
                .findAverageAmountByCategoryId(expense.getCategory().getId())
                .map(avg -> expense.getAmount().compareTo(avg.multiply(ANOMALY_MULTIPLIER)) > 0)
                .orElse(false); // no history → not an anomaly
    }
}