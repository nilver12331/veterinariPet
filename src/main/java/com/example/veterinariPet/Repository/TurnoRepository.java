package com.example.veterinariPet.Repository;

import com.example.veterinariPet.Entity.Turno;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TurnoRepository extends JpaRepository<Turno,Long> {
    // Método para obtener todos los turnos de un empleado específico
    List<Turno> findByEmpleadoId(long empleadoId);
}
