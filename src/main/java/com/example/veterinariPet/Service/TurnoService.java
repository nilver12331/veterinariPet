package com.example.veterinariPet.service;

import com.example.veterinariPet.Entity.Turno;
import com.example.veterinariPet.service.interfaces.turnoServiceInterface;
import com.example.veterinariPet.Repository.TurnoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TurnoService implements turnoServiceInterface {
    @Autowired
    TurnoRepository turnoRepository;
    @Override
    public List<Turno> obtenerTurnosPorEmpleado(long empleadoId) {
        return turnoRepository.findByEmpleadoIdEmpleado(empleadoId);
    }

    @Override
    public Turno cambiarEstadoTurno(long idTurno, int nuevoEstado) {
        // Buscar el turno por ID
        Turno turno = turnoRepository.findById(idTurno)
                .orElseThrow(() -> new EntityNotFoundException("Turno no encontrado"));

        // Cambiar el estado
        turno.setEstado(nuevoEstado);
        // Guardar el turno actualizado
        return turnoRepository.save(turno);
    }
}
