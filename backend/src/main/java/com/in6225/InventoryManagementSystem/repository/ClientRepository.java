package com.in6225.InventoryManagementSystem.repository;

import com.in6225.InventoryManagementSystem.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Long> {
}
