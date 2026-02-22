package com.expense.SpendsMate.repository;

import com.expense.SpendsMate.entity.VendorCategoryMapping;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// repository/VendorCategoryMappingRepository.java
public interface VendorCategoryMappingRepository extends JpaRepository<VendorCategoryMapping, Integer> {
    Optional<VendorCategoryMapping> findByVendorName(String vendorName);
}