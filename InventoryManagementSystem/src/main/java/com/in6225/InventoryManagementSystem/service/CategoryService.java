package com.in6225.InventoryManagementSystem.service;

import com.in6225.InventoryManagementSystem.dto.CategoryDTO;
import com.in6225.InventoryManagementSystem.dto.Response;

public interface CategoryService {
    Response createCategory(CategoryDTO categoryDTO);
    Response getAllCategories();
    Response getCategoryById(Long id);
    Response updateCategory(Long id, CategoryDTO categoryDTO);
    Response deleteCategory(Long id);
}
