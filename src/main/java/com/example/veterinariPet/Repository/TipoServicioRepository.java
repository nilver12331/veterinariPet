package com.example.veterinariPet.Repository;

import com.example.veterinariPet.Entity.Mascota;
import com.example.veterinariPet.Entity.TipoServicio;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TipoServicioRepository extends JpaRepository<TipoServicio,Long> {
}
