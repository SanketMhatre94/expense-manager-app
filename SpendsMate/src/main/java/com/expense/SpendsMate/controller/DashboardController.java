package com.expense.SpendsMate.controller;

import com.expense.SpendsMate.dto.DashboardSummary;
import com.expense.SpendsMate.dto.Response.ApiResponse;
import com.expense.SpendsMate.dto.Response.ExpenseResponse;
import com.expense.SpendsMate.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

// controller/DashboardController.java
@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/summary")
    public ResponseEntity<ApiResponse<DashboardSummary>> getSummary() {
        DashboardSummary summary = dashboardService.getSummary();
        return ResponseEntity.ok(ApiResponse.ok("Dashboard summary fetched", summary));
    }

    @GetMapping("/anomalies")
    public ResponseEntity<ApiResponse<List<ExpenseResponse>>> getAnomalies() {
        List<ExpenseResponse> anomalies = dashboardService.getSummary().getAnomalies();
        String message = anomalies.isEmpty()
                ? "No anomalies detected"
                : anomalies.size() + " anomal" + (anomalies.size() == 1 ? "y" : "ies") + " found";

        return ResponseEntity.ok(ApiResponse.ok(message, anomalies));
    }
}
