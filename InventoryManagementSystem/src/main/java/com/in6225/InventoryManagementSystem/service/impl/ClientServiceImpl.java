package com.in6225.InventoryManagementSystem.service.impl;


import com.in6225.InventoryManagementSystem.dto.ClientDTO;
import com.in6225.InventoryManagementSystem.dto.Response;
import com.in6225.InventoryManagementSystem.entity.Client;
import com.in6225.InventoryManagementSystem.exception.NotFoundException;
import com.in6225.InventoryManagementSystem.repository.ClientRepository;
import com.in6225.InventoryManagementSystem.service.ClientService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ClientServiceImpl implements ClientService {
    private final ClientRepository clientRepository;
    private final ModelMapper modelMapper;

    @Override
    public Response saveClient(ClientDTO clientDTO) {
        Client clientToSave = modelMapper.map(clientDTO, Client.class);

        clientRepository.save(clientToSave);

        return Response.builder()
                .status(200)
                .message("Client Saved Successfully")
                .build();
    }

    @Override
    public Response updateClient(Long id, ClientDTO clientDTO) {
        Client existingClient = clientRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Client Not Found"));

        if (clientDTO.getEmail() != null) existingClient.setEmail(clientDTO.getEmail());

        clientRepository.save(existingClient);

        return Response.builder()
                .status(200)
                .message("Client Was Successfully Updated")
                .build();
    }

    @Override
    public Response getAllClient() {
        List<Client> clients = clientRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));

        List<ClientDTO> clientDTOList = modelMapper.map(clients, new TypeToken<List<ClientDTO>>() {
        }.getType());

        return Response.builder()
                .status(200)
                .message("success")
                .clients(clientDTOList)
                .build();
    }

    @Override
    public Response getClientById(Long id) {
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Client Not Found"));

        ClientDTO clientDTO = modelMapper.map(client, ClientDTO.class);

        return Response.builder()
                .status(200)
                .message("success")
                .client(clientDTO)
                .build();
    }

    @Override
    public Response deleteClient(Long id) {
        clientRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Client Not Found"));

        clientRepository.deleteById(id);

        return Response.builder()
                .status(200)
                .message("Client Was Successfully Deleted")
                .build();
    }
}
