package com.expense.SpendsMate.service;

import com.expense.SpendsMate.entity.Category;
import com.expense.SpendsMate.entity.VendorCategoryMapping;
import com.expense.SpendsMate.repository.CategoryRepository;
import com.expense.SpendsMate.repository.VendorCategoryMappingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

// service/CategorizationService.java
@Service
@RequiredArgsConstructor
public class CategorizationService {

    private final VendorCategoryMappingRepository mappingRepository;
    private final CategoryRepository categoryRepository;

    public Category categorize(String vendor) {
        String key = vendor.trim().toLowerCase();
        return mappingRepository.findByVendorName(key)
                .map(VendorCategoryMapping::getCategory)
                .orElseGet(this::otherCategory);
    }

    private Category otherCategory() {
        return categoryRepository.findByName("Other")
                .orElseThrow(() -> new IllegalStateException("'Other' category missing from DB"));
    }
}