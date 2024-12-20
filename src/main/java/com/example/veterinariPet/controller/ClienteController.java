package com.example.veterinariPet.controller;
import com.example.veterinariPet.Entity.Cliente;
import com.example.veterinariPet.service.interfaces.clienteServiceInterface;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.*;

@RestController
@RequestMapping(path = "servicios/cliente")
public class ClienteController {
    @Autowired
    private final clienteServiceInterface clienteService;
    @Autowired
    public ClienteController(clienteServiceInterface clienteService) {
        this.clienteService = clienteService;
    }


    @GetMapping
    public List<Cliente> getAll() {
        return clienteService.getClients();
    }

    @PostMapping
    public void saveUpdate(@RequestBody Cliente cliente) {
        clienteService.saveOrUpdate(cliente);
    }

    @DeleteMapping("/{clienteId}")
    public void delete(@PathVariable("clienteId") Long clienteId) {
        clienteService.delete(clienteId);
    }

    @GetMapping("/{clienteId}")
    public Optional<Cliente> getById(@PathVariable("clienteId") Long clienteId) {
        return clienteService.getCliente(clienteId);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Cliente cliente, HttpSession session) {
        Optional<Cliente> existingCliente = clienteService.validarCredenciales(cliente.getEmail(), cliente.getContraseña());

        if (existingCliente.isPresent()) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Login exitoso");
            response.put("nombre", existingCliente.get().getNombre_cliente());

            // Guardar el cliente en la sesión
            session.setAttribute("usuario", existingCliente.get());

            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("message", "Credenciales incorrectas"));
        }
    }

    @GetMapping("/perfil/{email}")
    public ResponseEntity<Cliente> getClienteByEmail(@PathVariable("email") String email) {
        Optional<Cliente> cliente = clienteService.findByEmail(email);
        return cliente.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
    @PutMapping("/modificar/{email}")
    public ResponseEntity<Map<String, String>> modificarCliente(@PathVariable("email") String email, @RequestBody Cliente clienteModificado) {
        boolean isModified = clienteService.actualizarCliente(email, clienteModificado);

        Map<String, String> response = new HashMap<>();
        if (isModified) {
            response.put("message", "Datos actualizados exitosamente");
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "No se realizaron cambios en los datos");
            return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body(response);
        }
    }
    @GetMapping("/usuarioSesion")
    public ResponseEntity<Map<String, Object>> getUsuarioSesion(HttpSession session) {
        Cliente cliente = (Cliente) session.getAttribute("usuario");
        if (cliente != null) {
            Map<String, Object> response = new HashMap<>();
            response.put("idCliente", cliente.getIdCliente());
            response.put("nombre", cliente.getNombre_cliente());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("message", "Usuario no autenticado"));
        }
    }

}

