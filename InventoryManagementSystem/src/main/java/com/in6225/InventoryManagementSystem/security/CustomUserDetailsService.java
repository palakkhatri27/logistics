package com.in6225.InventoryManagementSystem.security;

import com.in6225.InventoryManagementSystem.entity.User;
import com.in6225.InventoryManagementSystem.exception.NotFoundException;
import com.in6225.InventoryManagementSystem.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NotFoundException("Username Not Found"));

        return AuthUser.builder()
                .user(user)
                .build();
    }
}
