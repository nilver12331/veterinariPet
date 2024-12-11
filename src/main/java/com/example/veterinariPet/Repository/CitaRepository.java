package com.example.veterinariPet.Repository;

import com.example.veterinariPet.Entity.Cita;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CitaRepository extends JpaRepository<Cita,Long> {
    List<Cita> findByMascotaIdMascota(Long idMascota);
}
