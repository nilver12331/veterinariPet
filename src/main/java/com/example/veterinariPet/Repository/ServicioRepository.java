package com.example.veterinariPet.Repository;

import com.example.veterinariPet.Entity.Mascota;
import com.example.veterinariPet.Entity.Servicio;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServicioRepository extends JpaRepository<Servicio,Long> {
}
