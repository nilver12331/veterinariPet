package com.example.veterinariPet.controller;

import com.example.veterinariPet.entity.Cliente;
import com.example.veterinariPet.services.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "servicios/cliente")
public class ClienteController {
    @Autowired
    private ClienteService clienteService;

    @GetMapping
    public List<Cliente>getAll(){
        return clienteService.getClientes();
    }
    @PostMapping
    public ResponseEntity<String> saveUpdate(@RequestBody Cliente cliente) {

        try {
            // Verificar si el cliente ya existe
            if (clienteService.existsByEmail(cliente.getEmail())) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("El cliente ya existe.");
            }
            //si no existe
            clienteService.saveOrUpdate(cliente);
            return ResponseEntity.ok("Cliente guardado exitosamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al guardar el cliente: " + e.getMessage());
        }
    }
    @DeleteMapping("/{idCliente}")
    public void delete(@PathVariable("idCliente")Long idCliente) {
        clienteService.delete(idCliente);
    }
    @GetMapping("/{idCliente}")
    public Optional<Cliente> getBId(@PathVariable("idCliente")Long idCliente){
        return clienteService.getClientes(idCliente);
        }

    }


