package com.example.veterinariPet.service.interfaces;

import com.example.veterinariPet.Entity.Cliente;

import java.util.List;
import java.util.Optional;

public interface clienteServiceInterface {
    List<Cliente> getClients();
    Optional<Cliente> getCliente(Long id);
    Cliente getClienteById(Long id);
    void saveOrUpdate(Cliente cliente);
    void delete(Long id);
    Cliente ObtenerUsuario(String email, String contraseña);
    Optional<Cliente> findByEmail(String email);
    Cliente buscarPorEmail(String email);
    boolean actualizarCliente(String email, Cliente clienteModificado);
    Optional<Cliente> validarCredenciales(String email, String contraseña);
}
