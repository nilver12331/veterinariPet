package com.example.veterinariPet.service;
import com.example.veterinariPet.Entity.Cliente;
import com.example.veterinariPet.service.interfaces.clienteServiceInterface;
import com.example.veterinariPet.Repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ClienteService implements clienteServiceInterface {

    @Autowired
    ClienteRepository clienteRepo;
    @Override
    public List<Cliente> getClients() {
        return clienteRepo.findAll();
    }
    @Override
    public Optional<Cliente> getCliente(Long id) {return clienteRepo.findById(id);
    }
    @Override
    public Cliente getClienteById(Long id) {
        return clienteRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
    }
    @Override
    public void saveOrUpdate(Cliente cliente) {
        clienteRepo.save(cliente);
    }
    @Override
    public void delete(Long id) {
        clienteRepo.deleteById(id);
    }
    @Override
    public Optional<Cliente> validarCredenciales(String email, String contraseña) {
        return clienteRepo.findByEmailAndContraseña(email, contraseña);
    }
    @Override
    public Cliente ObtenerUsuario(String email, String contraseña) {
        Optional<Cliente> UsuarioOpcional=clienteRepo.findByEmailAndContraseña(email, contraseña);
        if(UsuarioOpcional.isPresent()){
            Cliente cliente=UsuarioOpcional.get();
            if(cliente.getContraseña().equals(contraseña)){
                return cliente;
            }
        }
        return null;
    }
    @Override
    public Optional<Cliente> findByEmail(String email) {
        return clienteRepo.findByEmail(email);
    }
    @Override
    public Cliente buscarPorEmail(String email) {
        return clienteRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
    }
    @Override
    public boolean actualizarCliente(String email, Cliente clienteModificado) {
        Cliente clienteExistente = buscarPorEmail(email);
        boolean isModified = false;

        if (!Objects.equals(clienteExistente.getNombre_cliente(), clienteModificado.getNombre_cliente())) {
            clienteExistente.setNombre_cliente(clienteModificado.getNombre_cliente());
            isModified = true;
        }
        if (!Objects.equals(clienteExistente.getApellido_cliente(), clienteModificado.getApellido_cliente())) {
            clienteExistente.setApellido_cliente(clienteModificado.getApellido_cliente());
            isModified = true;
        }
        if (!Objects.equals(clienteExistente.getTipo_Documento(), clienteModificado.getTipo_Documento())) {
            clienteExistente.setTipo_Documento(clienteModificado.getTipo_Documento());
            isModified = true;
        }
        if (!Objects.equals(clienteExistente.getNumero_Documento(), clienteModificado.getNumero_Documento())) {
            clienteExistente.setNumero_Documento(clienteModificado.getNumero_Documento());
            isModified = true;
        }
        if (!Objects.equals(clienteExistente.getDireccion(), clienteModificado.getDireccion())) {
            clienteExistente.setDireccion(clienteModificado.getDireccion());
            isModified = true;
        }
        if (!Objects.equals(clienteExistente.getTelefono(), clienteModificado.getTelefono())) {
            clienteExistente.setTelefono(clienteModificado.getTelefono());
            isModified = true;
        }
        if (!Objects.equals(clienteExistente.getEmail(), clienteModificado.getEmail())) {
            clienteExistente.setEmail(clienteModificado.getEmail());
            isModified = true;
        }
        if (!Objects.equals(clienteExistente.getContraseña(), clienteModificado.getContraseña())) {
            clienteExistente.setContraseña(clienteModificado.getContraseña());
            isModified = true;
        }

        if (isModified) {
            clienteRepo.save(clienteExistente);
        }
        return isModified;
    }
}

