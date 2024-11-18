package com.example.veterinariPet.service.interfaces;

import com.example.veterinariPet.Entity.Empleado;

import java.util.List;

public interface empleadoServiceInterface {
    List<Empleado> getEmpleadosEspecialidad(Long idEspecialidad);
}
