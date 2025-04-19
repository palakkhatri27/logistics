package com.in6225.InventoryManagementSystem.service.impl;

import com.in6225.InventoryManagementSystem.dto.OrderDTO;
import com.in6225.InventoryManagementSystem.dto.OrderRequest;
import com.in6225.InventoryManagementSystem.entity.*;
import com.in6225.InventoryManagementSystem.enums.OrderType;
import com.in6225.InventoryManagementSystem.enums.OrderStatus;
import com.in6225.InventoryManagementSystem.exception.NotFoundException;
import com.in6225.InventoryManagementSystem.repository.ClientRepository;
import com.in6225.InventoryManagementSystem.repository.OrderRepository;
import com.in6225.InventoryManagementSystem.repository.ProductRepository;
import com.in6225.InventoryManagementSystem.dto.Response;
import com.in6225.InventoryManagementSystem.enums.OrderStatus;
import com.in6225.InventoryManagementSystem.repository.SupplierRepository;
import com.in6225.InventoryManagementSystem.service.OrderService;
import com.in6225.InventoryManagementSystem.service.UserService;
import com.in6225.InventoryManagementSystem.specification.OrderFilter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserService userService;
    private final ModelMapper modelMapper;
    private final SupplierRepository supplierRepository;
    private final ClientRepository clientRepository;

    @Override
    public Response createOrder(OrderRequest orderRequest) {
        System.out.println(orderRequest.getSupplierId());
        System.out.println(orderRequest.getClientId());
        Long productId = orderRequest.getProductId();
        Long supplierId = orderRequest.getSupplierId();
        Long clientId = orderRequest.getClientId();
        Integer quantity = orderRequest.getQuantity();
        OrderType orderType = orderRequest.getOrderType();
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException("Product Not Found"));

        Supplier supplier = supplierRepository.findById(supplierId)
                .orElseThrow(() -> new NotFoundException("Supplier Not Found"));

        Client client = clientRepository.findById(clientId)
                .orElseThrow(() -> new NotFoundException("Client Not Found"));

        User user = userService.getCurrentLoggedInUser();

        //update the stock quantity and re-save
        product.setStockQuantity(product.getStockQuantity() + quantity);
        productRepository.save(product);

        //create a order
        Order order = Order.builder()
                .orderType(orderType)
                .orderStatus(OrderStatus.PENDING)
                .product(product)
                .user(user)
                .productQuantity(quantity)
                .totalPrice(product.getPrice().multiply(BigDecimal.valueOf(quantity)))
                .description(orderRequest.getDescription())
                .supplier(supplier)
                .client(client)
                .build();

        orderRepository.save(order);
        return Response.builder()
                .status(200)
                .message("Order created successfully")
                .build();
    }

    @Override
    public Response getAllOrders(int page, int size, String filter) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "id"));
        //use the Order specification
        Specification<Order> spec = OrderFilter.byFilter(filter);
        Page<Order> orderPage = orderRepository.findAll(spec, pageable);

        List<OrderDTO> orderDTOS = modelMapper.map(orderPage.getContent(), new TypeToken<List<OrderDTO>>() {
        }.getType());

        orderDTOS.forEach(orderDTO -> {
            orderDTO.setUser(null);
            orderDTO.setProduct(null);
        });

        return Response.builder()
                .status(200)
                .message("success")
                .orders(orderDTOS)
                .totalElements(orderPage.getTotalElements())
                .totalPages(orderPage.getTotalPages())
                .build();
    }

    @Override
    public Response getAllOrdersById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Order Not Found"));

        OrderDTO orderDTO = modelMapper.map(order, OrderDTO.class);

        orderDTO.getUser().setOrderDTOList(null);

        return Response.builder()
                .status(200)
                .message("success")
                .order(orderDTO)
                .build();
    }

    @Override
    public Response getAllOrdersByMonthAndYear(int month, int year) {
        List<Order> orders = orderRepository.findAll(OrderFilter.byMonthAndYear(month, year));

        List<OrderDTO> orderDTOS = modelMapper.map(orders, new TypeToken<List<OrderDTO>>() {
        }.getType());

        orderDTOS.forEach(orderDTO -> {
            orderDTO.setUser(null);
            orderDTO.setProduct(null);
        });

        return Response.builder()
                .status(200)
                .message("success")
                .orders(orderDTOS)
                .build();
    }

    @Override
    public Response updateOrderStatus(Long orderId, OrderStatus orderStatus) {
        Order existingOrder = orderRepository.findById(orderId)
                .orElseThrow(() -> new NotFoundException("Order Not Found"));

        existingOrder.setOrderStatus(orderStatus);
        existingOrder.setUpdateAt(LocalDateTime.now());

        orderRepository.save(existingOrder);

        return Response.builder()
                .status(200)
                .message("Order Status Successfully Updated")
                .build();
    }
}
