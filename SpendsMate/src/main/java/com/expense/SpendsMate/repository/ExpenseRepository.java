package com.expense.SpendsMate.repository;

import com.expense.SpendsMate.dto.DashboardSummary;
import com.expense.SpendsMate.entity.Expense;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

// repository/ExpenseRepository.java
public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    // For anomaly detection: average amount per category
    @Query("""
        SELECT AVG(e.amount)
        FROM Expense e
        WHERE e.category.id = :categoryId
    """)
    Optional<BigDecimal> findAverageAmountByCategoryId(@Param("categoryId") Integer categoryId);

    // Dashboard: totals per category
    @Query("""
        SELECT new com.expense.SpendsMate.dto.DashboardSummary$CategoryTotal(
            e.category.name, SUM(e.amount)
        )
        FROM Expense e
        GROUP BY e.category.name
        ORDER BY SUM(e.amount) DESC
    """)
    List<DashboardSummary.CategoryTotal> findCategoryTotals();

    // Dashboard: top 5 vendors
    @Query("""
        SELECT new com.expense.SpendsMate.dto.DashboardSummary$VendorTotal(
            e.vendor, SUM(e.amount)
        )
        FROM Expense e
        GROUP BY e.vendor
        ORDER BY SUM(e.amount) DESC
    """)
    List<DashboardSummary.VendorTotal> findTopVendors(Pageable pageable);

    List<Expense> findByIsAnomalyTrue();
}