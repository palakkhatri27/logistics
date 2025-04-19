package com.in6225.InventoryManagementSystem.service;

import com.in6225.InventoryManagementSystem.dto.LoginRequest;
import com.in6225.InventoryManagementSystem.dto.RegisterRequest;
import com.in6225.InventoryManagementSystem.dto.Response;
import com.in6225.InventoryManagementSystem.dto.UserDTO;
import com.in6225.InventoryManagementSystem.entity.User;

public interface UserService {
    Response registerUser(RegisterRequest registerRequest);
    Response loginUser(LoginRequest loginRequest);
    Response getAllUsers();
    User getCurrentLoggedInUser();
    Response getUserById(Long id);
    Response updateUser(Long id, UserDTO userDTO);
    Response deleteUser(Long id);
    Response getUserOrders(Long id);
}
