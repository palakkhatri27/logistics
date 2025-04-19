package com.in6225.InventoryManagementSystem.specification;


import com.in6225.InventoryManagementSystem.entity.Order;
import com.in6225.InventoryManagementSystem.entity.Product;
import com.in6225.InventoryManagementSystem.entity.User;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

//Specification to filter orders from database
public class OrderFilter {
    public static Specification<Order> byFilter(String searchValue) {
        return (root, query, cb) -> {
            if (searchValue == null || searchValue.trim().isEmpty()) {
                return cb.conjunction(); // Always true
            }

            String pattern = "%" + searchValue.toLowerCase() + "%";

            // Create a list to hold all predicates
            List<Predicate> predicates = new ArrayList<>();

            // Order fields
            predicates.add(cb.like(cb.lower(root.get("description")), pattern));
            predicates.add(cb.like(cb.lower(root.get("orderStatus").as(String.class)), pattern));
            predicates.add(cb.like(cb.lower(root.get("orderType").as(String.class)), pattern));

            // Join User
            Join<Order, User> userJoin = root.join("user", JoinType.LEFT);
            predicates.add(cb.like(cb.lower(userJoin.get("username")), pattern));
            predicates.add(cb.like(cb.lower(userJoin.get("email")), pattern));

            // Join ProductList
            Join<Order, Product> productJoin = root.join("product", JoinType.LEFT);
            predicates.add(cb.like(cb.lower(productJoin.get("name")), pattern));
            predicates.add(cb.like(cb.lower(productJoin.get("sku")), pattern));

            return cb.or(predicates.toArray(new Predicate[0]));
        };
    }

    // Filtering orders by month and year
    public static Specification<Order> byMonthAndYear(int month, int year) {
        return (root, query, criteriaBuilder) -> {
            // Use the month and year functions on the createdAt date field
            Expression<Integer> monthExpression = criteriaBuilder.function("month", Integer.class, root.get("createdAt"));
            Expression<Integer> yearExpression = criteriaBuilder.function("year", Integer.class, root.get("createdAt"));

            // Create predicates for the month and year
            Predicate monthPredicate = criteriaBuilder.equal(monthExpression, month);
            Predicate yearPredicate = criteriaBuilder.equal(yearExpression, year);

            // Combine the month and year predicates
            return criteriaBuilder.and(monthPredicate, yearPredicate);
        };
    }

    // Filter orders by users
    public static Specification<Order> byUserId(Long userId) {
        return (root, query, cb) -> cb.equal(root.get("user").get("id"), userId);
    }
}
