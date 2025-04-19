package com.in6225.InventoryManagementSystem.service;

import com.in6225.InventoryManagementSystem.dto.SupplierDTO;
import com.in6225.InventoryManagementSystem.dto.Response;

public interface SupplierService {
    Response saveSupplier(SupplierDTO supplierDTO);
    Response updateSupplier(Long id, SupplierDTO supplierDTO);
    Response getAllSupplier();
    Response getSupplierById(Long id);
    Response deleteSupplier(Long id);
}
