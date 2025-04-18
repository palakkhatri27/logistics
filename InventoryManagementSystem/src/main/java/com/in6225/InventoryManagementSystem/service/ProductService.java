package com.in6225.InventoryManagementSystem.service;

import com.in6225.InventoryManagementSystem.dto.ProductDTO;
import com.in6225.InventoryManagementSystem.dto.Response;

public interface ProductService {
    Response saveProduct(ProductDTO productDTO);
    Response updateProduct(ProductDTO productDTO);
    Response getAllProducts();
    Response getProductById(Long id);
    Response deleteProduct(Long id);
    Response searchProduct(String input);
}
