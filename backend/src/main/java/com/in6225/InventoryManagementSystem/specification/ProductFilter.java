package com.in6225.InventoryManagementSystem.specification;

import com.in6225.InventoryManagementSystem.entity.Category;
import com.in6225.InventoryManagementSystem.entity.Product;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import org.springframework.data.jpa.domain.Specification;

public class ProductFilter {
    public static Specification<Product> byCategory(Long categoryId) {
        return (root, query, cb) -> {
            if (categoryId == null) {
                return cb.conjunction(); // no filtering
            }
            Join<Product, Category> categoryJoin = root.join("category", JoinType.LEFT);
            return cb.equal(categoryJoin.get("id"), categoryId);
        };
    }
}

