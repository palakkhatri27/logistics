package com.in6225.InventoryManagementSystem.entity;

import com.in6225.InventoryManagementSystem.enums.OrderStatus;
import com.in6225.InventoryManagementSystem.enums.OrderType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "orders")
@Data
@Builder
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer productQuantity;

    private BigDecimal totalPrice;

    @Enumerated(EnumType.STRING)
    private OrderType orderType; // receive, ship

    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus; //pending, completed, processing

    private String description;
    private final LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updateAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                ", productQuantity=" + productQuantity +
                ", totalPrice=" + totalPrice +
                ", orderType=" + orderType +
                ", orderStatus=" + orderStatus +
                ", description='" + description + '\'' +
                ", createdAt=" + createdAt +
                ", updateAt=" + updateAt +
                ", product=" + product +
                ", user=" + user +
                '}';
    }
}
