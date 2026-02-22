package com.expense.SpendsMate.service;

import com.expense.SpendsMate.dto.DashboardSummary;
import com.expense.SpendsMate.dto.Response.ExpenseResponse;
import com.expense.SpendsMate.entity.Expense;
import com.expense.SpendsMate.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
// service/DashboardService.java
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DashboardService {

    private final ExpenseRepository expenseRepository;

    public DashboardSummary getSummary() {
        List<ExpenseResponse> anomalies = expenseRepository.findByIsAnomalyTrue()
                .stream().map(this::toResponse).toList();

        return DashboardSummary.builder()
                .categoryTotals(expenseRepository.findCategoryTotals())
                .topVendors(expenseRepository.findTopVendors(PageRequest.of(0,5)))
                .anomalies(anomalies)
                .build();
    }

    private ExpenseResponse toResponse(Expense e) {
        return ExpenseResponse.builder()
                .id(e.getId()).date(e.getDate()).amount(e.getAmount())
                .vendor(e.getVendor()).description(e.getDescription())
                .category(e.getCategory().getName()).isAnomaly(true)
                .build();
    }
}