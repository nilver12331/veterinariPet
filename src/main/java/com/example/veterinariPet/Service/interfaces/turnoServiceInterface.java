package com.example.veterinariPet.service.interfaces;

import com.example.veterinariPet.Entity.Turno;

import java.util.List;

public interface turnoServiceInterface {
    List<Turno> obtenerTurnosPorEmpleado(long empleadoId);
}
