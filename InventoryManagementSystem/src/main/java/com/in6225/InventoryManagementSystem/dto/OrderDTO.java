package com.in6225.InventoryManagementSystem.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import com.in6225.InventoryManagementSystem.enums.OrderStatus;
import com.in6225.InventoryManagementSystem.enums.OrderType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class OrderDTO {
    private Long id;
    private Integer productQuantity;
    private BigDecimal totalPrice;
    private OrderType orderType; // receive, ship
    private OrderStatus orderStatus; //pending, processing, completed
    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime updateAt;
    private ProductDTO product;
    private UserDTO user;
}
