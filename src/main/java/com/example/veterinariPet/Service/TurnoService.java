package com.example.veterinariPet.service;

import com.example.veterinariPet.Entity.Turno;
import com.example.veterinariPet.service.interfaces.turnoServiceInterface;
import com.example.veterinariPet.Repository.TurnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TurnoService implements turnoServiceInterface {
    @Autowired
    TurnoRepository turnoRepository;
    @Override
    public List<Turno> obtenerTurnosPorEmpleado(long empleadoId) {
        return turnoRepository.findByEmpleadoId(empleadoId);
    }


}
