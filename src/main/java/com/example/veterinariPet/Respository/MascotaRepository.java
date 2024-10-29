package com.example.veterinariPet.Respository;

import com.example.veterinariPet.entity.Mascota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface MascotaRepository extends JpaRepository<Mascota,Long> {
    Optional<Mascota> findById(Long id);
}
