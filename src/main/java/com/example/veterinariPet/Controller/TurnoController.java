package com.example.veterinariPet.controller;

import com.example.veterinariPet.Entity.Turno;
import com.example.veterinariPet.service.TurnoService;
import com.example.veterinariPet.service.interfaces.turnoServiceInterface;
import com.example.veterinariPet.service.interfaces.mascotaServiceInterface;
import com.example.veterinariPet.service.interfaces.turnoServiceInterface;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "servicios/turno")
public class TurnoController {
    private final turnoServiceInterface servicioTurno;

    // Constructor para inyección de dependencias
    @Autowired
    public TurnoController(turnoServiceInterface servicioTurno) {
        this.servicioTurno = servicioTurno;
    }

    // Endpoint para obtener todos los turnos de un empleado específico
    @GetMapping("/empleado/{empleadoId}")
    public List<Turno> obtenerTurnosPorEmpleado(@PathVariable long empleadoId) {
        return servicioTurno.obtenerTurnosPorEmpleado(empleadoId);
    }
    // Endpoint para cambiar el estado de un turno
    @PutMapping("/cambiarEstado/{idTurno}")
    public ResponseEntity<String> cambiarEstadoTurno(@PathVariable long idTurno, @RequestParam int estado) {
        try {
            Turno turnoActualizado = servicioTurno.cambiarEstadoTurno(idTurno, estado);
            return ResponseEntity.ok("Estado del turno actualizado con éxito.");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
