package com.in6225.InventoryManagementSystem.dto;

import com.in6225.InventoryManagementSystem.enums.UserRole;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    @NotBlank(message = "Username is required")
    private String username;

    @NotBlank(message = "email is required")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;

    private UserRole role;
}
