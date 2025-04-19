package com.in6225.InventoryManagementSystem.service.impl;

import com.in6225.InventoryManagementSystem.entity.User;
import com.in6225.InventoryManagementSystem.dto.*;
import com.in6225.InventoryManagementSystem.enums.UserRole;
import com.in6225.InventoryManagementSystem.exception.InvalidCredentialsException;
import com.in6225.InventoryManagementSystem.exception.NotFoundException;
import com.in6225.InventoryManagementSystem.repository.UserRepository;
import com.in6225.InventoryManagementSystem.service.UserService;
import com.in6225.InventoryManagementSystem.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;
    private final JwtUtils jwtUtils;

    @Override
    public Response registerUser(RegisterRequest registerRequest) {

        UserRole role = UserRole.MANAGER;

        if (registerRequest.getRole() != null) {
            role = registerRequest.getRole();
        }

        User userToSave = User.builder()
                .username(registerRequest.getUsername())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .role(role)
                .build();

        userRepository.save(userToSave);

        return Response.builder()
                .status(200)
                .message("User was successfully registered")
                .build();
    }

    @Override
    public Response loginUser(LoginRequest loginRequest) {

        User user = userRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new NotFoundException("Username Not Found"));

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Password Does Not Match");
        }
        String token = jwtUtils.generateToken(user.getUsername());

        return Response.builder()
                .status(200)
                .message("User Logged in Successfully")
                .role(user.getRole())
                .token(token)
                .expirationTime("7 days")
                .build();
    }

    @Override
    public Response getAllUsers() {

        List<User> users = userRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
        users.forEach(user -> user.setOrderList(null));
        List<UserDTO> userDTOS = modelMapper.map(users, new TypeToken<List<UserDTO>>() {
        }.getType());

        return Response.builder()
                .status(200)
                .message("success")
                .users(userDTOS)
                .build();
    }

    @Override
    public User getCurrentLoggedInUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String username = authentication.getName();

        User user = userRepository.findByUsername(username).orElseThrow(() -> new NotFoundException("User Not Found"));

        user.setOrderList(null);

        return user;
    }

    @Override
    public Response getUserById(Long id) {

        User user = userRepository.findById(id).orElseThrow(() -> new NotFoundException("User Not Found"));

        UserDTO userDTO = modelMapper.map(user, UserDTO.class);

        user.setOrderList(null);

        return Response.builder()
                .status(200)
                .message("success")
                .user(userDTO)
                .build();
    }

    @Override
    public Response updateUser(Long id, UserDTO userDTO) {

        User existingUser = userRepository.findById(id).orElseThrow(() -> new NotFoundException("User Not Found"));

        if (userDTO.getUsername() != null) existingUser.setUsername(userDTO.getUsername());
        if (userDTO.getEmail() != null) existingUser.setEmail(userDTO.getEmail());
        if (userDTO.getRole() != null) existingUser.setRole(userDTO.getRole());

        if (userDTO.getPassword() != null && !userDTO.getPassword().isEmpty()) {
            existingUser.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        }
        userRepository.save(existingUser);

        return Response.builder()
                .status(200)
                .message("User successfully updated")
                .build();
    }

    @Override
    public Response deleteUser(Long id) {
        userRepository.findById(id).orElseThrow(() -> new NotFoundException("User Not Found"));

        userRepository.deleteById(id);

        return Response.builder()
                .status(200)
                .message("User successfully Deleted")
                .build();

    }

    @Override
    public Response getUserOrders(Long id) {

        User user = userRepository.findById(id).orElseThrow(() -> new NotFoundException("User Not Found"));

        UserDTO userDTO = modelMapper.map(user, UserDTO.class);

        userDTO.getOrderDTOList().forEach(orderDTO -> {
            orderDTO.setUser(null);
        });

        return Response.builder()
                .status(200)
                .message("success")
                .user(userDTO)
                .build();
    }
}
