package com.in6225.InventoryManagementSystem.service;

import com.in6225.InventoryManagementSystem.dto.Response;
import com.in6225.InventoryManagementSystem.dto.ClientDTO;

public interface ClientService {
    Response saveClient(ClientDTO clientDTO);
    Response updateClient(Long id, ClientDTO clientDTO);
    Response getAllClient();
    Response getClientById(Long id);
    Response deleteClient(Long id);
}
