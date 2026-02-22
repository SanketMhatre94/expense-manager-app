package com.expense.SpendsMate.repository;

import com.expense.SpendsMate.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// repository/CategoryRepository.java
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    Optional<Category> findByName(String name);
}
