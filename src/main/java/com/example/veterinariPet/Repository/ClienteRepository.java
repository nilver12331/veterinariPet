package com.example.veterinariPet.Repository;
import com.example.veterinariPet.Entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
@Repository

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    boolean existsByEmail(String email);
    Optional<Cliente> findByEmailAndContraseña(String email, String contraseña);
    Optional<Cliente> findByEmail(String email);
    Optional<Cliente> findById(Long id);

}