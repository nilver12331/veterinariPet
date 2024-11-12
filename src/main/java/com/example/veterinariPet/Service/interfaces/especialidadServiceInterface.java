package com.example.veterinariPet.service.interfaces;

import com.example.veterinariPet.Entity.Especialidad;

import java.util.List;
import java.util.Optional;

public interface especialidadServiceInterface {
    List<Especialidad> getEspecialidades();
    Optional<Especialidad> getEspecialidad(Long Id);
    void saveOrUpdateEspecialidad(Especialidad especialidad);
    void deleteEspecialidad(Long Id);
}
