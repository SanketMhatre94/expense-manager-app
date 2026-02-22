package com.expense.SpendsMate.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "vendor_category_mapping")
@Data
public class VendorCategoryMapping {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String vendorName; // stored lowercase

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;
}