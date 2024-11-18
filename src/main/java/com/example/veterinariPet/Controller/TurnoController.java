package com.example.veterinariPet.controller;

import com.example.veterinariPet.Entity.Turno;
import com.example.veterinariPet.service.TurnoService;
import com.example.veterinariPet.service.interfaces.turnoServiceInterface;
import com.example.veterinariPet.service.interfaces.mascotaServiceInterface;
import com.example.veterinariPet.service.interfaces.turnoServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
