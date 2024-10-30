package com.example.veterinariPet.repository;

import com.example.veterinariPet.entity.Mascota;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MascotaRepository extends JpaRepository<Mascota,Long> {
}
