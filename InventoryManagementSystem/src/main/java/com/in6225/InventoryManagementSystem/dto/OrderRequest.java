package com.in6225.InventoryManagementSystem.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.in6225.InventoryManagementSystem.enums.OrderType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class OrderRequest {
    @Positive(message = "product id is required")
    private Long productId;
    @Positive(message = "quantity id is required")
    private Integer quantity;
    @NotNull
    private OrderType orderType;
    private String description;
}
