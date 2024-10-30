package com.example.veterinariPet.service;
import com.example.veterinariPet.Entity.Especialidad;
import com.example.veterinariPet.Repository.EspecialidadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EspecialidadService {
    @Autowired
    EspecialidadRepository especialidadRepository;

    public List<Especialidad> getEspecialidades(){
        return especialidadRepository.findAll();
    }
    public Optional<Especialidad> getEspecialidad(Long Id){
        return especialidadRepository.findById(Id);
    }
    public void saveOrUpdateEspecialidad(Especialidad especialidad){
        especialidadRepository.save(especialidad);
    }
    public void deleteEspecialidad(Long Id){
        especialidadRepository.deleteById(Id);
    }

}
