package com.in6225.InventoryManagementSystem.controller;

import com.in6225.InventoryManagementSystem.dto.Response;
import com.in6225.InventoryManagementSystem.dto.ClientDTO;
import com.in6225.InventoryManagementSystem.service.ClientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/clients")
@RequiredArgsConstructor
public class ClientController {
    private final ClientService clientService;

    @PostMapping("/add")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> addClient(@RequestBody @Valid ClientDTO clientDTO) {
        return ResponseEntity.ok(clientService.saveClient(clientDTO));
    }

    @GetMapping("/all")
    public ResponseEntity<Response> getAllClients() {
        return ResponseEntity.ok(clientService.getAllClient());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Response> getClientById(@PathVariable Long id) {
        return ResponseEntity.ok(clientService.getClientById(id));
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> updateClient(@PathVariable Long id, @RequestBody @Valid ClientDTO clientDTO) {
        return ResponseEntity.ok(clientService.updateClient(id, clientDTO));
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> deleteClient(@PathVariable Long id) {
        return ResponseEntity.ok(clientService.deleteClient(id));
    }
}
