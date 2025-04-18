package com.in6225.InventoryManagementSystem.service;


import com.in6225.InventoryManagementSystem.dto.OrderRequest;
import com.in6225.InventoryManagementSystem.dto.Response;
import com.in6225.InventoryManagementSystem.enums.OrderStatus;

public interface OrderService {
    Response createOrder(OrderRequest orderRequest);

    Response getAllOrders(int page, int size, String filter);

    Response getAllOrdersById(Long id);

    Response getAllOrdersByMonthAndYear(int month, int year);

    Response updateOrderStatus(Long orderId, OrderStatus orderStatus);
}
