package com.example.veterinariPet.service;

import com.example.veterinariPet.Entity.Empleado;
import com.example.veterinariPet.service.interfaces.empleadoServiceInterface;
import com.example.veterinariPet.Repository.EmpleadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class EmpleadoService implements empleadoServiceInterface{
    private final EmpleadoRepository empleadoRepository;

    @Autowired
    public EmpleadoService(EmpleadoRepository empleadoRepository) {
        this.empleadoRepository = empleadoRepository;
    }

    @Override
    public List<Empleado> getEmpleadosEspecialidad(Long idEspecialidad) {
        return empleadoRepository.findByEspecialidad_IdEspecialidad(idEspecialidad);
    }
}
