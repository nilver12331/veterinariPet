package com.example.veterinariPet.services;


import com.example.veterinariPet.Entity.Cliente;
import com.example.veterinariPet.Repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class ClienteService {
    @Autowired
    ClienteRepository clienteRepository;

    public List<Cliente>getClientes(){
        return clienteRepository.findAll();
    }
    public Optional<Cliente> getClientes(Long idCliente){
        return clienteRepository.findById(idCliente);
    }

    public void saveOrUpdate(Cliente cliente){
        clienteRepository.save(cliente);
    }
    public void delete(Long idCliente){
        clienteRepository.deleteById(idCliente);
    }

    public boolean existsByEmail(String email) {
        return clienteRepository.existsByEmail(email);
    }

}
