package com.expense.SpendsMate.dto;
import com.expense.SpendsMate.dto.Response.ExpenseResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

// dto/DashboardSummary.java
@Data
@Builder
public class DashboardSummary {
    private List<CategoryTotal> categoryTotals;
    private List<VendorTotal>   topVendors;
    private List<ExpenseResponse> anomalies;

    @Data
    @AllArgsConstructor
    public static class CategoryTotal {
        private String category;
        private BigDecimal total;
    }

    @Data
    @AllArgsConstructor
    public static class VendorTotal {
        private String vendor;
        private BigDecimal total;
    }
}