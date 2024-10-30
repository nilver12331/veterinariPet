package com.example.veterinariPet.Repository;

import com.example.veterinariPet.Entity.Mascota;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MascotaRepository extends JpaRepository<Mascota,Long> {
    Optional<Mascota> findById(Long id);
}
