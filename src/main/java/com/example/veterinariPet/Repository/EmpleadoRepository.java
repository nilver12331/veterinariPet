package com.example.veterinariPet.Repository;

import com.example.veterinariPet.Entity.Empleado;
import com.example.veterinariPet.Entity.Mascota;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmpleadoRepository extends JpaRepository<Empleado,Long> {
    List<Empleado> findByEspecialidad_IdEspecialidad(Long idEspecialidad);
}
