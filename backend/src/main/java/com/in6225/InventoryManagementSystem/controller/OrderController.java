package com.in6225.InventoryManagementSystem.controller;

import com.in6225.InventoryManagementSystem.dto.OrderRequest;
import com.in6225.InventoryManagementSystem.dto.Response;
import com.in6225.InventoryManagementSystem.enums.OrderStatus;
import com.in6225.InventoryManagementSystem.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @PostMapping("/create_order")
    public ResponseEntity<Response> createNewOrder(@RequestBody @Valid OrderRequest orderRequest) {
        return ResponseEntity.ok(orderService.createOrder(orderRequest));
    }

    @GetMapping("/all")
    public ResponseEntity<Response> getAllOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String filter) {

        System.out.println("SEARCH VALUE IS: " +filter);
        return ResponseEntity.ok(orderService.getAllOrders(page, size, filter));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Response> getOrderById(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getAllOrdersById(id));
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<Response> getOrderByUserId(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getAllOrdersByUser(id));
    }

    @GetMapping("/by_month_year")
    public ResponseEntity<Response> getOrderByMonthAndYear(
            @RequestParam int month,
            @RequestParam int year) {

        return ResponseEntity.ok(orderService.getAllOrdersByMonthAndYear(month, year));
    }

    @PutMapping("/{orderId}")
    public ResponseEntity<Response> updateOrderStatus(
            @PathVariable Long orderId,
            @RequestBody OrderStatus status) {

        return ResponseEntity.ok(orderService.updateOrderStatus(orderId, status));
    }
}
